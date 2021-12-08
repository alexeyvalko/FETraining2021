import './page.scss';

import request from '../../request';
import { breads, ingredients, sauces } from '../../common/constants';
import Order from '../Order/Order';
import Checkout from '../Checkout/Checkout';
import Pizza from '../Pizza/Pizza';

class Page {
  constructor() {
    this.element = document.createElement('div');
    this.state = {
      bread: '',
      sauces: [],
      ingredients: [],
    };
    this.checkout = new Checkout(this.state);
    this.order = new Order(
      breads,
      ingredients,
      sauces,
      this.state,
      this.checkout,
    );
  }

  addButtonListener() {
    const eventHandler = async () => {
      const response = await request(
        new Pizza(this.state.bread, this.state.sauces, this.state.ingredients),
      );
      console.log(response);
    };

    this.checkout.button.addEventListener('click', eventHandler);
  }
  
  render() {
    this.order.render();
    this.checkout.render();
    this.element.classList.add('page');
    this.element.append(this.order.element, this.checkout.element);
    this.addButtonListener();
  }
}

export default Page;
