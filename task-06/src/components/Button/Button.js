import './button.scss';

/** Class representing a button */
class Button {
  
  /** Create button.
   * @param {string} text - button text
   * @param {string} type - types of button
   */

  constructor(text, type = 'button') {
    this.element = document.createElement('button');
    this.element.classList.add('button');
    this.element.type = type;
    this.element.textContent = text;
  }
}

export default Button;
