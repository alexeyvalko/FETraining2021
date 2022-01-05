import Input from './Input';
import Button from './Button';
import { getStudent } from './requests';

class Client {
  constructor() {
    this.container = document.createElement('div');
    this.buttonContainer = document.createElement('div');
    this.container.classList.add('container');
    this.buttonContainer.classList.add('button-container');

    this.allStudents = [];
    this.student = null;
    this.currentStudent = 0;
  }

  addButtonContainer() {
    this.container.append(this.buttonContainer);
  }

  async getStudent() {
    this.student = await getStudent(this.currentStudent)
  }

  addButtons() {
    const buttonNames = ['prev', 'insert', 'Edit', 'Next'];
    const buttons = buttonNames.map((name) => {
      const button = new Button(name).element;
      return button;
    });

    this.buttonContainer.append(...buttons);
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

  async render() {
    await this.getStudent();
    this.addInputs(this.student);
    this.addButtons();
    this.addButtonContainer();
  }
}

export default Client;
