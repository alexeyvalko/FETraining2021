import Canvas from './canvas';

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.canvas = new Canvas();
  }

  render() {
    this.canvas.draw()
    this.rootElement.append(this.canvas.element);
  }
}

export default App;
