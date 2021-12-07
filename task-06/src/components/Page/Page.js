import './page.scss';

import { breads, ingredients, sauces } from '../../common/constants';
import Order from '../Order/Order';
import Checkout from '../Checkout/Checkout';


class Page {
  constructor() {
    this.element = document.createElement('div');
    this.state = {
      bread: '',
      sauces: [],
      ingredients: []
    }
    this.checkout = new Checkout(this.state);
    this.order = new Order(breads, ingredients, sauces, this.state, this.checkout);
  }

  render() {
    this.order.render();
    this.checkout.render();
    this.element.classList.add('page');
    this.element.append(this.order.element, this.checkout.element);
  }
}

export default Page;
