import ChangeInfoItem from './ChangeInfoItem';
import LogItem from './LogItem';

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.appContainer = document.createElement('div');
    this.appContainer.classList.add('app-container');

    this.log = new LogItem();
    this.logItem = this.log.logItem;
    this.logContainer = this.log.logContainer;

    this.changeInfo = new ChangeInfoItem();
    this.changeInfoItem = this.changeInfo.item;

    this.items = [];
    this.picketCard = null;
  }

  generateItems(n) {
    let amount = n;
    while (amount) {
      const item = document.createElement('div');
      item.classList.add('app-item');
      item.dataset.item = `${amount}`;
      this.items.push(item);
      amount -= 1;
    }
  }

  async getData(n = 1) {
    try {
      const response = await fetch(`data/alexey_valko_data[${n}].json`);
      const data = await response.json();
      this.logger(n);
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }

  async showData(n = 1) {
    const item = this.items[n - 1];
    const data = await this.getData(n);
    const dataKeys = Object.keys(data);
    const rows = dataKeys.map((key) => {
      const el = document.createElement('div');
      el.classList.add(`${key}`);
      el.textContent = `${key}: ${data[key]}`;
      return el;
    });
    item.innerHTML = '';
    item.append(...rows);
  }

  showDataWithDelay(n) {
    setTimeout(() => {
      this.showData(n);
      this.updateDataWithInterval(n);
    }, n * 1000);
  }

  logger(n) {
    const el = document.createElement('div');
    el.classList.add(`log`);
    el.textContent = ` data ${n} was updated`;
    this.logContainer.insertAdjacentElement('afterbegin', el);
  }

  updateDataWithInterval(n, interval = 3000) {
    setInterval(() => {
      this.showData(n);
    }, interval);
  }

  addListener() {
    const eventHandler = async (e) => {
      const item = e.target.closest('.app-item');
      if (item && item.dataset.item) {
        this.picketCard = item.dataset.item;
        const data = await this.getData(this.picketCard);
        this.changeInfo.showData(data, this.picketCard);
      }
    };
    document.addEventListener('click', eventHandler, { capture: true });
  }

  render() {
    this.generateItems(3);
    this.showDataWithDelay(1);
    this.showDataWithDelay(2);
    this.showDataWithDelay(3);
    this.appContainer.append(...this.items, this.logItem, this.changeInfoItem);
    this.rootElement.append(this.appContainer);
    this.addListener();
    this.changeInfo.addListeners()
  }
}

export default App;
