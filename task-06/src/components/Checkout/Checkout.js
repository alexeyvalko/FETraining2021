import './checkout.scss';
import {
  TITLE_BREADS,
  TITLE_SAUCES,
  TITLE_INGREDIENTS,
} from '../../common/constants';
import addExtraCharge from '../../addExtraCharge';
import Pizza from '../Pizza/Pizza';
import Button from '../Button/Button';

/** Class representing an checkout window. */

class Checkout {
  /** Create a checkout window.
   * @param {object} state - object with picked ingredients
   */

  constructor(state) {
    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.button = new Button('Отправить').element;
    this.title = this.createTitle('Ваша пицца!');
    this.state = state;
    this.container.classList.add('checkout-container');
    this.totalPrice = 0;
    this.totalCalories = 0;
  }

  /**
   * Create h2 element from string
   * @param {string} title - category title.
   * @return {HTMLElement} h2 element
   */

  createTitle(title) {
    const titleElement = document.createElement('h2');
    titleElement.classList.add('title');
    titleElement.textContent = title;
    return titleElement;
  }

  /**
   * Create row with price and calories
   * @param {string} ingredient - ingredient name  .
   * @param {string} title - category of topping
   * @return {HTMLElement} html element representing a row with price and calories
   */

  createPriceRow(ingredient, title) {
    const priceRow = document.createElement('div');
    try {
      priceRow.classList.add('price-row');
      const price = Pizza.getPrice(ingredient, title);
      this.totalPrice += price;
      const calories = Pizza.getCalories(ingredient, title);
      this.totalCalories += calories;
      priceRow.textContent = `${ingredient} - Цена: ${price} Калории: ${calories}`;
    } catch (err) {
      console.error('Ошибка!');
    }
    return priceRow;
  }

  /**
   * Create row for category of topping
   * @param {string} title - category name .
   * @param {array | string} topping - string or array with ingredient names
   * @return {HTMLElement} html element representing a row
   */

  createRow(title, topping) {
    const row = document.createElement('div');
    const titleElement = this.createTitle(title);
    if (typeof topping === 'string') {
      const priceRow = this.createPriceRow(topping, title);
      row.append(titleElement, priceRow);
    } else {
      const priceRow = topping.map((item) => this.createPriceRow(item, title));
      row.append(titleElement, ...priceRow);
    }
    row.classList.add('row');
    return row;
  }

  /**
   * Create row with total price and calories
   * @return {HTMLElement} html element representing a row with total price and calories
   */

  totalRow() {
    const row = document.createElement('div');
    const titleElement = this.createTitle('Итого:');
    const infoElement = document.createElement('div');
    this.totalPrice = addExtraCharge(this.totalPrice);
    infoElement.textContent = `Цена: ${this.totalPrice} Калории: ${this.totalCalories}`;
    row.classList.add('total-row');
    infoElement.classList.add('total-info');
    row.append(titleElement, infoElement);
    return row;
  }

  clear() {
    this.container.innerHTML = '';
    this.totalPrice = 0;
    this.totalCalories = 0;
  }

  
  /**
   * Render checkout window
   */

  render() {
    this.clear();

    this.container.append(this.title);
    if (this.state.bread) {
      const breadRow = this.createRow(TITLE_BREADS, this.state.bread);
      this.container.append(breadRow);
    }
    if (this.state.ingredients.length > 0) {
      const ingredientsRow = this.createRow(
        TITLE_INGREDIENTS,
        this.state.ingredients,
      );
      this.container.append(ingredientsRow);
    }
    if (this.state.sauces.length > 0) {
      const sauceRow = this.createRow(TITLE_SAUCES, this.state.sauces);
      this.container.append(sauceRow);
    }
    this.container.append(this.totalRow(), this.button);

    this.element.classList.add('checkout');
    this.element.appendChild(this.container);
  }
}

export default Checkout;
