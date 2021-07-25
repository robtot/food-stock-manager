
const joi = require('joi');
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../../sequelize/index.js');
const models = sequelize.models;

// schema for validating users env variable
const stockItemSchema = joi.object({
  name: joi.string().required(),
  amount: joi.number().required()
});

async function getAll(req, res) {
	const stock = await models.StockItem.findAll({
    where: {
      userId: req.query.id
    },
    attributes: ['name', 'amount']
  });
	res.status(200).json(stock);
};

async function addToStock(req, res) {
  const stockItem = req.body;
  const userId = req.query.id;
  const { error } = stockItemSchema.validate(stockItem);
  if (error) return res.status(400).send(error.message);

  // check ingredient name is valid
  const items = await models.Item.findAll({
    attributes: ['name']
  });
  if (!items.map(item => item.name).includes(stockItem.name)) return res.status(404).send(`Ingredient with name ${stockItem.name} not found.`);

  const updateResult = await models.StockItem.update(
    { amount: Sequelize.literal(`amount + ${stockItem.amount}`) },
    { 
      where: {
        userId,
        name: stockItem.name
      }
    }
  );

  // if item did not exist
  if (updateResult[0] === 0) {
    await models.StockItem.create(Object.assign(stockItem, { userId }))    
  }

  const updatedStockItem = await models.StockItem.findOne({
    where: { userId, name: stockItem.name },
    attributes: ['name', 'amount']
  });
  res.status(200).json(updatedStockItem);
}

async function subtractRecipeIngredientsFromStock(req, res) {
  const userId = req.query.id;
	const recipeName = req.query.recipe;
  if (!recipeName) return res.status(400).send('recipe query param must be set to recipe name');

	// check recipe exists
	const recipes = await models.Recipe.findAll({
		attributes: ['name', 'ingredients' ]
	});
  const recipe = recipes.find(r => r.name === recipeName)
	if (!recipe) return res.status(404).send(`Recipe with name ${recipeName} not found.`)

	// attempt to subtract amounts from stock with transaction
	const t = await sequelize.transaction();
  try {
    for (const ingredient of recipe.ingredients) {
      const ingredientUpdateResult = await models.StockItem.update(
        { amount: Sequelize.literal(`amount - ${ingredient.amount}`) },
        { 
          where: {
            userId,
            name: ingredient.name,
            amount: {
              [Op.gte]: ingredient.amount
            }
          }
        }
      );
      if (ingredientUpdateResult[0] === 0) {
        throw new Error('InsufficientIngredients') 
      }
    }

    await t.commit();
    res.status(200).send('Ingredients for recipe removed from stock');
  } catch (error) {
    await t.rollback();
    res.status(400).send('Insufficient ingredients in stock for recipe');
  }
};

module.exports = {
	getAll,
  addToStock,
  subtractRecipeIngredientsFromStock
};
