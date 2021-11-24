import keyValues from './keyValues';
import autoScaleText from './autoScaleText';

class Calculator {
  constructor(parentElement) {
    this.rootElement = parentElement;
    this.calculator = document.createElement('div');
    this.displayContainer = document.createElement('div');
    this.keysContainer = document.createElement('div');
    this.actualEquation = document.createElement('div');
    this.currentItem = document.createElement('div');

    this.actualFontSize = 30;
    this.allEquations = [];
    this.isClearLine = false;
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

  clearDisplay() {
    this.actualEquation.textContent = '';
    this.currentItem.textContent = '';
    this.actualFontSize = 30;
  }

  checkSymbol(symbol) {
    const isSymbol = /^[+\-✕÷]$/.test(symbol);
    const isC = symbol === 'C';
    const isPlusMinus = symbol === '±';
    if (isPlusMinus) {
      return this.currentItem.textContent[0] === '-'
        ? this.currentItem.textContent.slice(1)
        : `-${this.currentItem.textContent}`;
    }
    if (isC) {
      this.clearDisplay();
      return '';
    }
    if (isSymbol) {
      this.isClearLine = true;
      this.actualEquation.textContent += this.currentItem.textContent + symbol;
      return this.currentItem.textContent;
    }
    if (this.isClearLine) {
      this.isClearLine = false;
      return symbol;
    }

    return this.currentItem.textContent + symbol;
  }

  addListeners() {
    const mouseEventHandler = (e) => {
      const isKey = e.target.matches('.key');
      const isKeyDown = e.target.matches('.key-down');
      const targetValue = e.target.textContent;
      if (isKeyDown) {
        this.actualFontSize = autoScaleText(
          this.displayContainer.clientWidth,
          this.currentItem.clientWidth,
          this.actualFontSize,
        );
        this.currentItem.style.fontSize = `${this.actualFontSize}px`;
        this.currentItem.textContent = this.checkSymbol(targetValue);
      }
      if (isKey) {
        e.target.classList.toggle('key-down');
      }
    };

    this.keysContainer.addEventListener('mousedown', mouseEventHandler);
    this.keysContainer.addEventListener('mouseup', mouseEventHandler);
  }

  createDisplayItem(content) {
    const displayItem = document.createElement('div');
    displayItem.classList.add('display-item');
    displayItem.textContent = content;
    return displayItem;
  }

  render() {
    this.currentItem = this.createDisplayItem('');
    this.actualEquation = this.createDisplayItem('');
    this.keysContainer.append(...this.generateKeys());
    this.displayContainer.append(this.currentItem, this.actualEquation);
    this.calculator.append(this.displayContainer, this.keysContainer);
    this.rootElement.append(this.calculator);

    this.addListeners();
  }
}

export default Calculator;
