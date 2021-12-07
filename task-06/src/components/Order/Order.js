import './order.scss';
import {
  TITLE_BREADS,
  TITLE_INGREDIENTS,
  TITLE_SAUCES,
} from '../../common/constants';

class Order {
  constructor(breads, ingredients, sauces) {
    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.breads = breads;
    this.ingredients = ingredients;
    this.sauces = sauces;

    this.breadElements = [];
    this.ingredientElements = [];
    this.saucesElements = [];

    this.breadToOrder = '';
    this.saucesToOrder = [];
    this.ingredientsToOrder = [];
  }

  generateToppingElements(toppings) {
    const toppingsArray = toppings.map((topping) => {
      const el = document.createElement('div');
      el.classList.add('order-topping');
      el.textContent = topping.name;
      return el;
    });

    return toppingsArray;
  }

  createTitle(title) {
    const titleElement = document.createElement('h2');
    titleElement.classList.add('row-title');
    titleElement.textContent = title;
    return titleElement;
  }

  createToppingContainer(toppingsElements) {
    const toppingsContainer = document.createElement('div');
    toppingsContainer.classList.add('toppings-container');
    toppingsContainer.append(...toppingsElements);
    return toppingsContainer;
  }

  addToCheckout(title, targetText) {
    switch (title) {
      case TITLE_BREADS:
        this.breadToOrder = targetText;
        break;
      case TITLE_INGREDIENTS:
        if (!this.ingredientsToOrder.includes(targetText)) {
          this.ingredientsToOrder.push(targetText);
        } else {
          this.ingredientsToOrder = this.ingredientsToOrder.filter(
            (value) => value !== targetText,
          );
        }
        break;
      case TITLE_SAUCES:
        if (!this.saucesToOrder.includes(targetText)) {
          this.saucesToOrder.push(targetText);
        } else {
          this.saucesToOrder = this.saucesToOrder.filter(
            (value) => value !== targetText,
          );
        }
        break;
      default:
        throw new Error(`Error title ${title}`);
    }
  }

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
    };

    container.addEventListener('click', eventHandler);
  }

  createRow(title, toppingElements) {
    const row = document.createElement('div');
    const titleElement = this.createTitle(title);
    const toppingsContainer = this.createToppingContainer(toppingElements);
    this.addListeners(toppingsContainer, toppingElements, title);
    row.classList.add('row');
    row.append(titleElement, toppingsContainer);
    return row;
  }

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
