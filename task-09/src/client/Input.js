export default class Input {
  constructor(label, value = '') {
    this.inputContainer = document.createElement('div');
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    
    this.input.value = value;
    this.label.textContent = label;
    this.label.htmlFor = label
    this.input.id = label;
    this.input.dataset.name = label
    this.input.type = 'text';
    this.input.classList.add('input');
    this.label.classList.add('label');
    this.inputContainer.classList.add('input-container');
    this.inputContainer.append(this.label, this.input)
  }
}
