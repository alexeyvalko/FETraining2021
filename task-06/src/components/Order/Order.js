import './order.scss';
import {
  TITLE_BREADS,
  TITLE_INGREDIENTS,
  TITLE_SAUCES,
} from '../../common/constants';

class Order {
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
    titleElement.classList.add('title');
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
