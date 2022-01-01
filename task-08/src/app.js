
class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.appContainer = document.createElement('div');
  }



  render() {
    this.rootElement.append(this.appContainer);
  }
}

export default App;
