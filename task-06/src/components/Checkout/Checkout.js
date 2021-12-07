import './checkout.scss';
import { TITLE_BREADS, TITLE_SAUCES, TITLE_INGREDIENTS } from '../../common/constants';
import Pizza from '../Pizza/Pizza';

class Checkout {
  constructor(state) {
    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.title = this.createTitle('Ваша пицца!');
    this.state = state;
    this.container.classList.add('checkout-container');
  }

  createTitle(title) {
    const titleElement = document.createElement('h2');
    titleElement.classList.add('title');
    titleElement.textContent = title;
    return titleElement;
  }

  createPriceRow(topping, title) {
    const priceRow = document.createElement('div');
    priceRow.classList.add('price-row');
    const price = Pizza.getPrice(topping, title);
    const calories = Pizza.getCalories(topping, title);
    priceRow.textContent = `${topping} - Цена: ${price} Калории: ${calories}`;
    return priceRow;
  }

  createRow(title, topping) {
    const row = document.createElement('div');
    const titleElement = this.createTitle(title);
    if (typeof topping === 'string') {
      const priceRow = this.createPriceRow(topping, title);
      row.append(titleElement, priceRow);
    } else {
      const priceRow = topping.map((item) => this.createPriceRow(item, title));
      row.classList.add('row');
      row.append(titleElement, ...priceRow);
    }
    row.classList.add('row');
    return row;
  }

  clear() {
    this.container.innerHTML = '';
  }

  render() {
    this.clear();
    this.container.append(this.title);
    if (this.state.bread) {
      const breadRow = this.createRow(TITLE_BREADS, this.state.bread);
      this.container.append(breadRow);
    }
    if (this.state.ingredients.length > 0) {
      const ingredientsRow = this.createRow(TITLE_INGREDIENTS, this.state.ingredients);
      this.container.append(ingredientsRow);
    }
    if (this.state.sauces.length > 0) {
      const sauceRow = this.createRow(TITLE_SAUCES, this.state.sauces);
      this.container.append(sauceRow);
    }
    this.element.classList.add('checkout');
    this.element.appendChild(this.container);
  }
}

export default Checkout;
