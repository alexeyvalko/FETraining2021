import Input from './Input';
import Button from './Button';
import { getStudent, addStudent, updateStudent, delStudent } from './requests';

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
    this.student = await getStudent(this.currentStudent);
  }

  addButtons() {
    const buttonNames = ['Prev', 'insert', 'Edit', 'Del', 'Next'];
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

  addListeners() {
    const handleClick = async (e) => {
      const button = e.target.textContent;
      switch (button) {
        case 'Next':
          this.currentStudent += 1;
          await this.getStudent();
          this.addInputs(this.student);
          this.addButtonContainer();
          break;
        case 'Prev':
          this.currentStudent =  this.currentStudent > 0 ? this.currentStudent-1 : 0;
          await this.getStudent();
          this.addInputs(this.student);
          this.addButtonContainer();
          break;
        case 'insert':
          await addStudent(this.student);
          break;
        case 'Del':
          console.log('aa')
            await delStudent(this.currentStudent);
            this.currentStudent += 1;
            await this.getStudent();
            this.addInputs(this.student);
            this.addButtonContainer();
            break;
        case 'Edit':
          await updateStudent(this.student, this.currentStudent);
          break;
        default:
          console.log(`Sorry, we are out of ${button}.`);
      }
    };

    const inputListener = (e) => {
      const input = e.target;
      const key = input.dataset.name;
      this.student[key] = input.value;
    };

    this.container.addEventListener('input', inputListener);
    this.buttonContainer.addEventListener('click', handleClick);
  }

  async render() {
    await this.getStudent();
    this.addInputs(this.student);
    this.addButtons();
    this.addButtonContainer();
    this.addListeners();
  }
}

export default Client;
