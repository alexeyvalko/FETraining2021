import keyValues from './keyValues';
import autoScaleText from '../autoScaleText';
import Checkbox from '../Checkbox';
import RadioElement from '../RadioElement';
import Button from '../Button/Button';

class Calculator {
  constructor(parentElement) {
    this.rootElement = parentElement;
    this.button = new Button('Show history');
    this.historyContainer = document.createElement('div');
    this.historyWindow = document.createElement('div');
    this.historyWindowInnerContainer = document.createElement('div');

    this.calculator = document.createElement('div');
    this.displayContainer = document.createElement('div');
    this.keysContainer = document.createElement('div');
    this.prevItemDisplay = document.createElement('div');
    this.currentItemDisplay = document.createElement('div');
    this.optionsContainer = document.createElement('div');
    this.integersOption = document.createElement('div');
    this.priorityOption = document.createElement('div');
    this.checkboxElement = new Checkbox();
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

    this.actualFontSize = 32;

    this.currentSymbol = null;
    this.prevNumber = null;
    this.currentNumber = null;

    this.numbersStack = [];
    this.operandsStack = [];
    this.priorityRanks = {
      '+': 1,
      '-': 1,
      '✕': 2,
      '÷': 2,
    };

    this.operationHistory = []; // здесь хранится история операций
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
    this.currentNumber = null;
    this.actualFontSize = 32;
    this.currentSymbol = '';
    this.prevNumber = null;
    this.numbersStack = [];
    this.operandsStack = [];
  }

  calc(currentNumber = this.currentNumber) {
    let result = currentNumber;
    if (this.prevNumber !== null) {
      switch (this.currentSymbol) {
        case '+':
          result = this.prevNumber + currentNumber;
          break;
        case '-':
          result = this.prevNumber - currentNumber;
          break;
        case '÷':
          result = this.prevNumber / currentNumber;
          break;
        case '✕':
          result = this.prevNumber * currentNumber;
          break;
        default:
          result = currentNumber;
      }

      this.operationHistory.push(
        `${this.prevNumber} ${this.currentSymbol} ${currentNumber} = ${result}`,
      );
      this.showHistory();
    }

    return this.radioElementInt.radio.checked ? Math.round(result) : result;
  }

  calcWithoutPriority(operand, lastNumber) {
    this.currentNumber = lastNumber;
    this.prevNumber = this.calc(this.currentNumber);
    this.currentSymbol = operand;
    this.showCalcHistory(this.currentSymbol, this.currentNumber);
    this.actualFontSize = 32;
    this.currentItemDisplay.textContent = '';
  }

  getResultWithoutPriority() {
    const showValue =
      this.currentItemDisplay.textContent !== ''
        ? this.calc(parseFloat(this.currentItemDisplay.textContent, 10))
        : this.prevNumber;
    this.currentNumber = showValue;
    this.currentItemDisplay.textContent = this.currentNumber;
    this.prevItemDisplay.textContent = '';
    this.prevNumber = null;
    this.currentSymbol = '';
  }

  showCalcHistory(operand, lastNumber) {
    const lastOperationElement = document.createElement('span');
    const lasOperandElement = document.createElement('span');
    lasOperandElement.classList.add('symbol-element');
    lastOperationElement.textContent = ` ${lastNumber}`;
    lasOperandElement.textContent = ` ${operand}`;
    lastOperationElement.insertAdjacentElement('beforeend', lasOperandElement);
    this.prevItemDisplay.appendChild(lastOperationElement);
  }

  calcWithPriority(operand, lastNumber, recCall = false) {
    const lastOperand = operand;
    const operandsStackLength = this.operandsStack.length;
    const lastOperandInStack = this.operandsStack[operandsStackLength - 1];
    const isHigherPriority =
      this.priorityRanks[lastOperand] > this.priorityRanks[lastOperandInStack];
    this.numbersStack.push(lastNumber);
    if (!recCall) {
      this.showCalcHistory(lastOperand, lastNumber);
    }
    if (recCall) {
      this.prevItemDisplay.textContent = '';
      this.showCalcHistory(lastOperand, lastNumber);
    }
    this.currentItemDisplay.textContent = '';
    if (operandsStackLength === 0 || isHigherPriority) {
      this.operandsStack.push(operand);
    }

    if (operandsStackLength > 0 && !isHigherPriority) {
      this.currentSymbol = this.operandsStack.pop();
      this.currentNumber = this.numbersStack.pop();
      this.prevNumber = this.numbersStack.pop();
      const resultNumber = this.calc();
      this.calcWithPriority(lastOperand, resultNumber, true);
    }
  }

  getResultWithPriority() {
    const numbersStuckLength = this.numbersStack.length;

    if (this.currentItemDisplay.textContent !== '') {
      const lastNumber = parseFloat(this.currentItemDisplay.textContent, 10);
      this.numbersStack.push(lastNumber);
      this.currentItemDisplay.textContent = '';
    }

    if (numbersStuckLength > 1) {
      this.currentNumber = this.numbersStack.pop();
      this.prevNumber = this.numbersStack.pop();
      this.currentSymbol = this.operandsStack.pop();
      const lastNumber = this.calc();
      this.numbersStack.push(lastNumber);
      this.getResultWithPriority();
    }
    if (numbersStuckLength === 1) {
      this.prevItemDisplay.textContent = '';
      this.currentItemDisplay.textContent = this.numbersStack.pop();
    }
  }

  doSomeAction(value) {
    const isSymbol = /^[+\-✕÷]$/.test(value);
    const isC = value === 'C';
    const isPlusMinus = value === '±';
    const isNumberOrDot = !/^[+\-✕÷C=±]$/.test(value);
    const isEquals = value === '=';
    const lastNumber = parseFloat(this.currentItemDisplay.textContent, 10);
    if (isNumberOrDot) {
      this.showValueOnDisplay(value);
    }

    if (isSymbol && this.currentItemDisplay.textContent !== '') {
      if (this.checkboxElement.checkbox.checked) {
        this.calcWithPriority(value, lastNumber);
      } else {
        this.calcWithoutPriority(value, lastNumber);
      }
    }

    if (isEquals) {
      if (this.checkboxElement.checkbox.checked) {
        this.getResultWithPriority();
      } else {
        this.getResultWithoutPriority();
      }
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

  showHistory() {
    this.historyWindowInnerContainer.innerHTML = '';
    const history = this.operationHistory.map((item) => {
      const el = document.createElement('div');
      el.textContent = item;
      return el;
    });
    this.historyWindowInnerContainer.append(...history.reverse());
    if(this.historyWindowInnerContainer.clientHeight >= 320) {
      this.historyWindowInnerContainer.classList.add('scroll-y')
    }
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

    const priorityCheckboxHandler = () => {
      this.checkboxElement.checkbox.checked =
        !this.checkboxElement.checkbox.checked;
      this.clear();
    };

    const buttonHandler = () => {
      const isWindowOpen = this.historyContainer.contains(this.historyWindow);
      if (isWindowOpen) {
        this.historyWindow.remove();
      } else {
        this.showHistory();
        this.historyWindow.append(this.historyWindowInnerContainer);
        this.historyContainer.appendChild(this.historyWindow);
      }
    };

    this.button.element.addEventListener('click', buttonHandler);
    this.checkboxElement.label.addEventListener(
      'click',
      priorityCheckboxHandler,
    );
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
    this.priorityOption.append(this.checkboxElement.checkboxContainer);
    this.integersOption.append(
      this.radioElementInt.radioContainer,
      this.radioElementDec.radioContainer,
    );
    this.priorityOption.classList.add('priority-option');
    this.integersOption.classList.add('integers-option');
    this.optionsContainer.classList.add('options-container');
    this.calculator.classList.add('calculator');
    this.displayContainer.classList.add('display-container');
    this.keysContainer.classList.add('keys-container');
    this.historyContainer.classList.add('history-container');
    this.historyWindow.classList.add('history-window');
    this.historyWindowInnerContainer.classList.add('history-inner')
    this.historyContainer.append(this.button.element);

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
    this.rootElement.append(this.calculator, this.historyContainer);
    this.addListeners();
  }
}

export default Calculator;
