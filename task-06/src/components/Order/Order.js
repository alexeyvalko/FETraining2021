import './order.scss';
import {
  TITLE_BREADS,
  TITLE_INGREDIENTS,
  TITLE_SAUCES,
} from '../../common/constants';

/** Class representing an order window. */

class Order {
  /**
   * Create a order window.
   * @param {array} breads - array breads.
   * @param {array} ingredients - array with ingredients
   * @param {array} sauces - array with sauces
   * @param {object} checkout - instance of Checkout class
   */

  constructor(breads, ingredients, sauces, state, checkout) {
    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.breads = breads;
    this.ingredients = ingredients;
    this.sauces = sauces;

    this.breadElements = [];
    this.ingredientElements = [];
    this.saucesElements = [];
    this.checkout = checkout;
    this.state = state;
  }

  /**
   * Convert array with ingredients to array with div elements.
   * @param {array} topping - array with ingredients.
   * @return {array} array with div elements
   */

  generateToppingElements(topping) {
    const toppingsArray = topping.map((ingredient) => {
      const el = document.createElement('div');
      el.classList.add('order-topping');
      el.textContent = ingredient.name;
      return el;
    });

    return toppingsArray;
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
   * Create div container and put HTMLelements in it
   * @param {array} toppingElements - array with HTMLelements.
   * @return {HTMLElement} div container
   */

  createToppingContainer(toppingElements) {
    const toppingsContainer = document.createElement('div');
    toppingsContainer.classList.add('toppings-container');
    toppingsContainer.append(...toppingElements);
    return toppingsContainer;
  }

  /**
   * Add ingredients to state
   * @param {string} title - category of ingredients.
   * @param {string} targetText - name of picked ingredient.
   */

  addToCheckout(title, targetText) {
    switch (title) {
      case TITLE_BREADS:
        this.state.bread = targetText;
        break;
      case TITLE_INGREDIENTS:
        if (!this.state.ingredients.includes(targetText)) {
          this.state.ingredients.push(targetText);
        } else {
          this.state.ingredients = this.state.ingredients.filter(
            (value) => value !== targetText,
          );
        }
        break;
      case TITLE_SAUCES:
        if (!this.state.sauces.includes(targetText)) {
          this.state.sauces.push(targetText);
        } else {
          this.state.sauces = this.state.sauces.filter(
            (value) => value !== targetText,
          );
        }
        break;
      default:
        throw new Error(`Error title ${title}`);
    }
  }

  /**
   * Add event listeners to container with ingredients
   * @param {HTMLElement} container - container with ingredients .
   * @param {array} elements - array with ingredients
   * @param {string} elements - category of ingredients
   */

  addListeners(container, elements, title) {
    const eventHandler = (e) => {
      const targetText = e.target.textContent;
      if (title === TITLE_BREADS) {
        elements.forEach((el) => {
          if (el.textContent === targetText) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      } else {
        elements.forEach((el) => {
          if (el.textContent === targetText) {
            el.classList.toggle('active');
          }
        });
      }
      this.addToCheckout(title, targetText);
      this.checkout.render();
    };

    container.addEventListener('click', eventHandler);
  }

  /**
   * Create row for category of topping
   * @param {string} title - category name .
   * @param {array} toppingElements - array with ingredient elements
   * @return {HTMLElement} html element representing a row
   */

  createRow(title, toppingElements) {
    const row = document.createElement('div');
    const titleElement = this.createTitle(title);
    const toppingsContainer = this.createToppingContainer(toppingElements);
    this.addListeners(toppingsContainer, toppingElements, title);
    row.classList.add('row');
    row.append(titleElement, toppingsContainer);
    return row;
  }

  /**
   * Render order window
   */

  render() {
    this.breadElements = this.generateToppingElements(this.breads);
    this.ingredientElements = this.generateToppingElements(this.ingredients);
    this.saucesElements = this.generateToppingElements(this.sauces);
    const breadsRow = this.createRow(TITLE_BREADS, this.breadElements);
    const ingredientsRow = this.createRow(
      TITLE_INGREDIENTS,
      this.ingredientElements,
    );
    const saucesRow = this.createRow(TITLE_SAUCES, this.saucesElements);
    this.container.append(breadsRow, ingredientsRow, saucesRow);
    this.container.classList.add('order-container');
    this.element.classList.add('order');
    this.element.appendChild(this.container);
  }
}

export default Order;
