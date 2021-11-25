import keyValues from './keyValues';
import autoScaleText from './autoScaleText';
import Checkbox from './Checkbox';
import RadioElement from './RadioElement';

class Calculator {
  constructor(parentElement) {
    this.rootElement = parentElement;
    this.calculator = document.createElement('div');
    this.displayContainer = document.createElement('div');
    this.keysContainer = document.createElement('div');
    this.prevItemDisplay = document.createElement('div');
    this.currentItemDisplay = document.createElement('div');
    this.symbolElement = document.createElement('span');
    this.optionsContainer = document.createElement('div');
    this.integersOption = document.createElement('div');
    this.priorityOption = document.createElement('div');
    this.checkbox = new Checkbox();
    this.defaultRadioCheck = true;
    this.radioElementInt = new RadioElement(
      'integers',
      'Int',
      !this.defaultRadioCheck,
    );
    this.radioElementDec = new RadioElement(
      'integers',
      'Dec',
      this.defaultRadioCheck,
    );

    this.currentSymbol = null;
    this.prevItem = null;
    this.currentItem = null;
    this.actualFontSize = 30;
    this.allEquations = [];

    this.priorityOption.append(this.checkbox.checkbox, this.checkbox.label);
    this.integersOption.append(
      this.radioElementInt.radioContainer,
      this.radioElementDec.radioContainer,
    );
    this.priorityOption.classList.add('priority-option');
    this.integersOption.classList.add('integers-option');
    this.optionsContainer.classList.add('options-container');
    this.symbolElement.classList.add('symbol-element');
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

  clear() {
    this.prevItemDisplay.textContent = '';
    this.currentItemDisplay.textContent = '';
    this.currentItem = null;
    this.actualFontSize = 30;
    this.currentSymbol = '';
    this.prevItem = null;
  }

  calc(currentNumber) {
    let result = currentNumber;
    if (this.prevItem !== null) {
      switch (this.currentSymbol) {
        case '+':
          result = this.prevItem + currentNumber;
          break;
        case '-':
          result = this.prevItem - currentNumber;
          break;
        case '÷':
          result = this.prevItem / currentNumber;
          break;
        case '✕':
          result = this.prevItem * currentNumber;
          break;
        default:
          result = this.radioElementInt.radio.checked
            ? Math.round(currentNumber)
            : currentNumber;
      }
    }

    return this.radioElementInt.radio.checked ? Math.round(result) : result;
  }

  doSomeAction(value) {
    const isSymbol = /^[+\-✕÷]$/.test(value);
    const isC = value === 'C';
    const isPlusMinus = value === '±';
    const isNumberOrDot = !/^[+\-✕÷C=±]$/.test(value);
    const isEquals = value === '=';

    if (isNumberOrDot) {
      this.showValueOnDisplay(value);
    }

    if (isSymbol && this.currentItemDisplay.textContent !== '') {
      this.currentItem = parseFloat(this.currentItemDisplay.textContent, 10);
      this.prevItem = this.calc(this.currentItem);
      this.currentSymbol = value;
      this.prevItemDisplay.textContent = `${this.prevItem}`;
      this.prevItemDisplay.insertAdjacentElement(
        'beforeend',
        this.symbolElement,
      );
      this.symbolElement.textContent = ` ${this.currentSymbol}`;
      this.actualFontSize = 30;
      this.currentItemDisplay.textContent = '';
    }

    if (isEquals) {
      const showValue =
        this.currentItemDisplay.textContent !== ''
          ? this.calc(parseFloat(this.currentItemDisplay.textContent, 10))
          : this.prevItem;
      this.currentItem = showValue;
      this.currentItemDisplay.textContent = this.currentItem;
      this.prevItemDisplay.textContent = '';
      this.symbolElement.textContent = '';
      this.prevItem = null;
      this.currentSymbol = '';
    }

    if (isPlusMinus) {
      this.currentItemDisplay.textContent =
        this.currentItemDisplay.textContent[0] === '-'
          ? this.currentItemDisplay.textContent.slice(1)
          : `-${this.currentItemDisplay.textContent}`;
    }

    if (isC) {
      this.clear();
    }
  }

  scaleMainItemFontSize() {
    this.actualFontSize = autoScaleText(
      this.displayContainer.clientWidth,
      this.currentItemDisplay.clientWidth,
      this.actualFontSize,
    );
    this.currentItemDisplay.style.fontSize = `${this.actualFontSize}px`;
  }

  showValueOnDisplay(value) {
    const isDot = value === '.';
    this.scaleMainItemFontSize();
    if (isDot) {
      const isDotShown =
        this.currentItemDisplay.textContent.split('.').length > 1;
      this.currentItemDisplay.textContent +=
        isDotShown || this.radioElementInt.radio.checked ? '' : '.';
    } else {
      this.currentItemDisplay.textContent += value;
    }
  }

  addListeners() {
    const mouseEventHandler = (e) => {
      const isKey = e.target.matches('.key');
      const isKeyDown = e.target.matches('.key-down');
      const targetValue = e.target.textContent;
      if (isKeyDown) {
        this.doSomeAction(targetValue);
      }
      if (isKey) {
        e.target.classList.toggle('key-down');
      }
    };

    const integersOptionHandler = (e) => {
      if (e.target.matches('label')) {
        this.defaultRadioCheck = !this.defaultRadioCheck;
        this.radioElementInt.radio.checked = !this.defaultRadioCheck;
        this.radioElementDec.radio.checked = this.defaultRadioCheck;
      }
    };

    this.integersOption.addEventListener('click', integersOptionHandler);
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
    this.currentItemDisplay = this.createDisplayItem('');
    this.prevItemDisplay = this.createDisplayItem('');
    this.optionsContainer.append(this.priorityOption, this.integersOption);
    this.keysContainer.append(...this.generateKeys());
    this.displayContainer.append(this.currentItemDisplay, this.prevItemDisplay);
    this.calculator.append(
      this.optionsContainer,
      this.displayContainer,
      this.keysContainer,
    );
    this.rootElement.append(this.calculator);
    this.addListeners();
    this.checkbox.addListeners();
  }
}

export default Calculator;
