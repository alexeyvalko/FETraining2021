class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.appContainer = document.createElement('div');
    this.appContainer.classList.add('app-container');
  }

  generateItems(n) {
    let amount = n;
    const items = [];
    while (amount) {
      const item = document.createElement('div');
      item.classList.add('app-item');
      items.push(item);
      amount -= 1;
    }
    return items;
  }

  render() {
    this.appContainer.append(...this.generateItems(5));
    this.rootElement.append(this.appContainer);
  }
}

export default App;
