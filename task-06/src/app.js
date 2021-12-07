import Page from './components/Page/Page';

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.page = new Page();
  }

  render() {
    this.page.render();
    this.rootElement.append(this.page.element);
  }
}

export default App;
