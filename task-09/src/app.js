import Client from "./client/Client";

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.client = new Client()
  }

   render() {
    this.client.render()
    this.rootElement.append(this.client.container);
  }
}

export default App;
