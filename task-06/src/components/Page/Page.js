import './page.scss';

import Order from '../Order/Order';
import Checkout from '../Checkout/Checkout';

class Page {
  constructor() {
    this.element = document.createElement('div');
    this.order = new Order();
    this.checkout = new Checkout();
  }

  render() {
    this.order.render();
    this.checkout.render();
    this.element.classList.add('page');
    this.element.append(this.order.element, this.checkout.element);
  }
}

export default Page;
