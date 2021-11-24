import keyValues from "./keyValues";

class Calculator {
  constructor(parentElement) {
    this.rootElement = parentElement;
    this.calculator = document.createElement('div');
    this.displayContainer = document.createElement('div');
    this.keysContainer = document.createElement('div');

    this.calculator.classList.add('calculator');
    this.displayContainer.classList.add('display-container');
    this.keysContainer.classList.add('keys-container');

  }

  generateKeys() {
    const keys = keyValues.map((item) => {
      const key = document.createElement('button');
      key.classList.add('key');
      key.textContent = item;
      return key;
    });
    return keys;
  }
  

  addListeners() {
    const mouseEventHandler = (e) => {
      const isKey = e.target.matches('.key')
      if(isKey) {
        e.target.classList.toggle('key-down')
      }
    }
    
    this.keysContainer.addEventListener('mousedown', mouseEventHandler)
    this.keysContainer.addEventListener('mouseup', mouseEventHandler)
  }

  createDisplayItem(content) {
    const displayItem = document.createElement('div')
    displayItem.classList.add('display-item')
    displayItem.textContent = content
    return displayItem
  }

  render() {
    this.keysContainer.append(...this.generateKeys());
    this.displayContainer.append(this.createDisplayItem('12+123'), this.createDisplayItem('123+123124'), this.createDisplayItem('12+123'), this.createDisplayItem('12+123'), this.createDisplayItem('12+123'))
    this.calculator.append(this.displayContainer, this.keysContainer);
    this.rootElement.append(this.calculator);

    this.addListeners()
  }
}

export default Calculator;
