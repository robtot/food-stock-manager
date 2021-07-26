import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  ButtonGroup,
  Button,
  Input,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import {
  fetchInitialData,
  addToStock,
  useRecipe as recipeUseAction
} from './stockActions.js';

// validates string as parseable integer
function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

/**
 * Checks if there is enough ingredients for recipe in stock
 * @param {Array} recipeIngredients
 * @param {Array} stock 
 * @returns {Boolean}
 */
export function hasIngredients(recipeIngredients, stock) {
  for (const ingredient of recipeIngredients) {
    const foundInStock = stock.findIndex(stockItem => stockItem.name === ingredient.name);
    if (foundInStock === -1) return false;
    if (stock[foundInStock].amount < ingredient.amount) return false;
  }
  return true;
}

/**
 * React Stock page component
 */
export function Stock() {
  const dispatch = useDispatch();

  const stock = useSelector((state) => state.stock); // stock Redux state

  // Add to stock functionality state
  const [newItemDropdownOpen, setNewItemDropdownOpen] = useState(false);
  const toggleNewItemDropDown = () => setNewItemDropdownOpen(prevState => !prevState);
  const [newItemAmount, setNewItemAmount] = useState(1);
  const [newItemName, setNewItemName] = useState(null);

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);

  if (stock.isError) {
    return(<div>Sorry, something went wrong when communicating with backend. You may try refreshing page</div>);
  }

  // render
  return (
    <div>
      <Alert color={newItemName ? 'success' : 'secondary'} className={newItemName ? "m-3 pb-0 text-center" : "m-3 text-center"}>
        {
          newItemName ? <div className="d-flex justify-content-center">
            <div className="m-3"><p><b>{newItemName}</b></p></div>
            <div className="m-2">
              <Input
                type="text"
                placeholder="Amount"
                value={ !isNaN(newItemAmount) ? newItemAmount : '' }
                onChange={(e) => {
                  if (isNormalInteger(e.target.value) || e.target.value === '') setNewItemAmount(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="m-2">
              <ButtonGroup>
                <Button
                  disabled={ isNaN(newItemAmount) }
                  onClick={() => {
                    dispatch(addToStock(newItemName, newItemAmount));
                    setNewItemName(null);
                  }}
                  color="success"
                >
                  Add
                </Button>
                <Button onClick={() => setNewItemName(null)} outline>Cancel</Button>
              </ButtonGroup>
            </div>
          </div> : <Dropdown isOpen={newItemDropdownOpen} toggle={toggleNewItemDropDown}>
            <DropdownToggle caret>
              Add ingredient to stock
            </DropdownToggle>
            <DropdownMenu container="body">
              { stock.ingredients.map(ingredient => <DropdownItem key={ingredient.name} onClick={() => setNewItemName(ingredient.name)}>{ingredient.name}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
        }
      </Alert>
      <div className="m-3">
        <div>
          <h3>Items in stock</h3>
          <ListGroup className="flex-wrap" horizontal>
            { stock.stock.map(item => <ListGroupItem key={item.name}><b>{item.amount}</b> {item.name}</ListGroupItem>) }
          </ListGroup>
        </div>
        <div className="mt-3">
          <h3>Recipes</h3>
          <ListGroup>
            { stock.recipes.map(recipe => <ListGroupItem key={recipe.name}>
                <h6>{recipe.name}</h6>
                <div>
                  {recipe.ingredients.map(ingredient => <div key={ingredient.name}>{ingredient.amount} {ingredient.name}</div>)}
                </div>
                <div><Button disabled={!hasIngredients(recipe.ingredients, stock.stock)} onClick={() => dispatch(recipeUseAction(recipe.name))}>Make recipe</Button></div>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
