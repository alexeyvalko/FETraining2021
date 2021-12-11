import './page.scss';

import request from '../../request';
import { breads, ingredients, sauces } from '../../common/constants';
import Order from '../Order/Order';
import Checkout from '../Checkout/Checkout';
import Pizza from '../Pizza/Pizza';

/** Class representing a page. */
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

  /** Add listener to checkout button and send request. */

  addButtonListener() {
    const eventHandler = async () => {
      const pizza = new Pizza(
        this.state.bread,
        this.state.sauces,
        this.state.ingredients,
      );
      const response = await request(pizza);
      console.log(response);
    };

    this.checkout.button.addEventListener('click', eventHandler);
  }

  /** Render page */

  render() {
    this.order.render();
    this.checkout.render();
    this.element.classList.add('page');
    this.element.append(this.order.element, this.checkout.element);
    this.addButtonListener();
  }
}

export default Page;
