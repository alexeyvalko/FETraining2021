class Button {
  constructor(text, type = 'button') {
  this.element = document.createElement('button');
  this.element.classList.add('button');
  this.element.type = type;
  this.element.textContent = text;
}
}

export default Button;