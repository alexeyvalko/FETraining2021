import {
  ingredients,
  sauces,
  breads,
  TITLE_BREADS,
  TITLE_INGREDIENTS,
  TITLE_SAUCES,
} from '../../common/constants';

/** Class representing a pizza. */
class Pizza {

    /**
   * Create a pizza.
   * @param {string} bread - Bread name.
   * @param {array} sauces - Array with sauce names.
   * @param {array} ingredients - Array with ingredient names
   */

  constructor(breadName = '', sauceNames = [], ingredientNames = []) {
    this.bread = breadName;
    this.sauces = sauceNames;
    this.ingredients = ingredientNames;
  }

  /**
   * Get the price of the ingredient.
   * @param {string} ingredient - ingredient name.
   * @param {string} title - Ingredient category
   * @return {number} ingredient price
   */

  static getPrice(ingredient, title) {
    let price = 0;
    switch (title) {
      case TITLE_BREADS:
        price = breads.find((item) => item.name === ingredient).cost;
        break;
      case TITLE_INGREDIENTS:
        price = ingredients.find((item) => item.name === ingredient).cost;
        break;
      case TITLE_SAUCES:
        price = sauces.find((item) => item.name === ingredient).cost;
        break;
      default:
        throw new Error('Invalid title while getPrice');
    }
    return price;
  }


  /**
   * Get calories of the ingredient.
   * @param {string} ingredient - ingredient name.
   * @param {string} title - ingredient category
   * @return {number} ingredient calories
   */

  static getCalories(ingredient, title) {
    let calories = 0;
    switch (title) {
      case TITLE_BREADS:
        calories = breads.find((item) => item.name === ingredient).calories;
        break;
      case TITLE_INGREDIENTS:
        calories = ingredients.find((item) => item.name === ingredient).calories;
        break;
      case TITLE_SAUCES:
        calories = sauces.find((item) => item.name === ingredient).calories;
        break;
      default:
        throw new Error('Invalid title while getPrice');
    }
    return calories;
  }
}

export default Pizza;
