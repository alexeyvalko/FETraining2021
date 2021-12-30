import Canvas from './canvas/canvas';
import TrashCan from './TrashCan';

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.canvas = new Canvas();
    this.appContainer = document.createElement('div');
    this.trash = new TrashCan(this.appContainer)


    
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.classList.add('button-container');
  }

  createButtons() {
    const buttonNames = ['canvas', 'Trash can'];
    const buttons = buttonNames.map((name) => {
      const el = document.createElement('button');
      el.classList.add('button');
      el.textContent = name;
      return el;
    });
    this.buttonContainer.append(...buttons);
  }

  addListener() {
    this.buttonContainer.onclick = (e) => {
      const canvas = e.target.textContent === 'canvas';
      const trash = e.target.textContent === 'Trash can';
      if (canvas) {
        this.appContainer.innerHTML = '';
        this.appContainer.append(this.canvas.element);
      }
      if (trash) {
        this.appContainer.innerHTML = '';
        this.trash.render()
      }
    };
  }

  render() {
    this.appContainer.append(this.canvas.element);
    this.canvas.draw();
    this.createButtons();
    this.rootElement.append(this.buttonContainer, this.appContainer);
    this.addListener();
  }
}

export default App;
