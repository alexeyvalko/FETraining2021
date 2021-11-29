class Button {
  constructor(text) {
    this.element = document.createElement('div');
    this.element.classList.add('button');
    this.element.textContent = text;
    this.element.classList.add('button');
  }
}

export default Button;
