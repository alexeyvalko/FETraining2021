import Button from './Button';
import EventCard from './EventCard'

class ChangeInfoItem {
  constructor() {
    this.item = document.createElement('div');
    this.item.classList.add('app-item');
    this.title = document.createElement('h3');
    this.container = document.createElement('div');
    this.container.classList.add('change-container');

    this.button = new Button('save').element;
    this.item.append(this.title, this.container, this.button);
   
    this.picketCard = null;
    this.data = null;
  }

  showData(data, picketCard) {
    this.picketCard = picketCard;
    this.data = data;
    const dataKeys = Object.keys(data);
    const rows = dataKeys.map((key) => {
      const el = document.createElement('div');
      el.classList.add(`${key}`, 'change-item');
      el.dataset.item = `${key}`;
      el.textContent = `${key}: ${data[key]}`;
      return el;
    });
    this.container.innerHTML = '';
    this.container.append(...rows);
  }

  createInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input');
    return input;
  }

  addListeners() {
    const buttonHandler = () => {
      console.log(this.data)
      const event = new EventCard(this.data);
      this.download(
        JSON.stringify(event),
        `alexey_valko_data[${this.picketCard}].json`,
        'application/json',
      );
    };

    const blurHandler = (e) => {
      const key = e.target.dataset.item;
      this.data[key] = e.target.value;
      this.container.innerHTML = '';
      this.showData(this.data, this.picketCard);
    };

    const clickHandler = (e) => {
      if (e.target.matches('.change-item')) {
        const input = this.createInput();
        const span = document.createElement('span');
        span.textContent = `${e.target.dataset.item}: `;
        input.dataset.item = e.target.dataset.item;
        input.value = this.data[e.target.dataset.item];
        e.target.innerHTML = '';
        e.target.append(span, input);
        input.focus();
        input.addEventListener('blur', blurHandler);
      }
    };

    this.button.addEventListener('click', buttonHandler);
    this.container.addEventListener('click', clickHandler);
  }

  download(content, fileName, contentType) {
    const link = document.createElement('a');
    const file = new Blob([content], {
      type: contentType,
    });
    link.download = fileName;
    link.href = URL.createObjectURL(file);
    link.click();
  }
}

export default ChangeInfoItem;
