import {
  ingredients,
  sauces,
  breads,
  TITLE_BREADS,
  TITLE_INGREDIENTS,
  TITLE_SAUCES,
} from '../../common/constants';

class Pizza {
  constructor(breadName = '', sauceNames = [], ingredientNames = []) {
    this.bread = breadName;
    this.sauces = sauceNames;
    this.ingredients = ingredientNames;
  }

  static getPrice(topping, title) {
    let price = 0;
    switch (title) {
      case TITLE_BREADS:
        price = breads.find((item) => item.name === topping).cost;
        break;
      case TITLE_INGREDIENTS:
        price = ingredients.find((item) => item.name === topping).cost;
        break;
      case TITLE_SAUCES:
        price = sauces.find((item) => item.name === topping).cost;
        break;
      default:
        throw new Error('Invalid title while getPrice');
    }
    return price;
  }

  static getCalories(topping, title) {
    let calories = 0;
    switch (title) {
      case TITLE_BREADS:
        calories = breads.find((item) => item.name === topping).calories;
        break;
      case TITLE_INGREDIENTS:
        calories = ingredients.find((item) => item.name === topping).calories;
        break;
      case TITLE_SAUCES:
        calories = sauces.find((item) => item.name === topping).calories;
        break;
      default:
        throw new Error('Invalid title while getPrice');
    }
    return calories;
  }
}

export default Pizza;
