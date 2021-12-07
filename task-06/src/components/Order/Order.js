import './order.scss';

import { breads, ingredients, sauces } from '../../common/constants';

class Order {
  constructor() {
    this.element = document.createElement('div');
    this.container = document.createElement('div');
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

  createTitle(title){
    const titleElement = document.createElement('h2');
    titleElement.classList.add('row-title')
    titleElement.textContent = title;
    return titleElement;
  }



  createRow(title, toppings) {
    const titleElement = this.createTitle(title)
    const row = document.createElement('div');
    const toppingsElements = this.generateToppingElements(toppings);
    const toppingsContainer = document.createElement('div');
    toppingsContainer.classList.add('toppings-container');
    toppingsContainer.append(...toppingsElements);
    row.classList.add('row');
    row.append(titleElement, toppingsContainer);
    return row;
  }

  render() {
    const breadsRow = this.createRow('Основания', breads);
    const ingredientsRow = this.createRow('Ингридиенты', ingredients)
    const saucesRow = this.createRow('Соусы', sauces)
    this.container.append(breadsRow, ingredientsRow, saucesRow);
    this.container.classList.add('order-container');
    this.element.classList.add('order');
    this.element.appendChild(this.container);
  }
}

export default Order;
