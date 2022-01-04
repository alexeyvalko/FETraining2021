import Input from './Input';
import Button from './Button'

class Client {
  constructor() {
    this.container = document.createElement('div');
    this.buttonContainer = document.createElement('div');
    this.container.classList.add('container');

    this.buttonContainer.classList.add('button-container');
  }

  addButtonContainer() {
    this.container.append(this.buttonContainer);
  }

  addButtons() {
    const buttonNames = ['prev', 'insert', 'Edit', 'Next']
    const buttons = buttonNames.map((name) => {
      const button = new Button(name).element
      return button
    })

    this.buttonContainer.append(...buttons)
  }

  addInputs(student) {
    this.student = student;
    const studentKeys = Object.keys(student);
    const inputs = studentKeys.map((key) => {
      const input = new Input(key, this.student[key]);
      return input.inputContainer;
    });

    this.container.innerHTML = '';
    this.container.append(...inputs);
  }

  render() {
    this.addInputs({ id: 'ss', name: 'vasya' });
    this.addButtons();
    this.addButtonContainer();
  }
}

export default Client;
