import './checkout.scss';

class Checkout {
  constructor() {
    this.element = document.createElement('div');
    this.container = document.createElement('div');
  }

  render() {
    this.container.classList.add('order-container');
    this.element.classList.add('checkout');
    this.element.appendChild(this.container);
  }
}

export default Checkout;
