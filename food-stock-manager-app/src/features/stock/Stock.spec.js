import { hasIngredients } from './Stock.js';

describe('Stock component', () => {
  it('hasIngredients function enough', () => {
    const testRecipeIngredients = [
      {
        name: 'apple',
        amount: 1
      },
      {
        name: 'banana',
        amount: 1
      }
    ];
    const testStock = [
      {
        name: 'apple',
        amount: 3
      },
      {
        name: 'banana',
        amount: 1
      }
    ];

    expect(hasIngredients(testRecipeIngredients, testStock)).toEqual(true);
  });

  it('hasIngredients function not enough', () => {
    const testRecipeIngredients = [
      {
        name: 'apple',
        amount: 1
      },
      {
        name: 'banana',
        amount: 1
      }
    ];
    const testStock = [
      {
        name: 'apple',
        amount: 0
      },
      {
        name: 'banana',
        amount: 1
      }
    ];

    expect(hasIngredients(testRecipeIngredients, testStock)).toEqual(false);
  });

  it('hasIngredients function not enough 2', () => {
    const testRecipeIngredients = [
      {
        name: 'apple',
        amount: 1
      },
      {
        name: 'banana',
        amount: 1
      }
    ];
    const testStock = [
      {
        name: 'banana',
        amount: 1
      }
    ];

    expect(hasIngredients(testRecipeIngredients, testStock)).toEqual(false);
  });
});
