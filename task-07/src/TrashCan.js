class TrashCan {
  constructor(appContainer) {
    this.element = document.createElement('div');
    this.element.id = 'trash';
    this.element.classList.add('trash');
    this.appContainer = appContainer;

    this.trashCan = document.createElement('div');

    this.paper = document.createElement('div');
    this.paper.classList.add('paper');
  }

  drawTrashCan(state) {
    this.element.append(this.trashCan);
    this.trashCan.classList.add('trashcan', state);
  }

  addPapers() {
    let amount = 5;
    const papers = [];
    while (amount !== 0) {
      const paper = document.createElement('div');
      const topPosition = 120 + Math.round(Math.random() * 300);
      const leftPosition = 220 + Math.round(Math.random() * 300 + Math.random() * 200);
      paper.classList.add('paper');
      paper.style.top = `${topPosition}px`;
      paper.style.left = `${leftPosition}px`;
      papers.push(paper);
      amount -=1;
    }

    this.element.append(...papers);
  }

  addListener() {
    const canHandler = () => {
      this.trashCan.classList.toggle('opened');
    };

    this.trashCan.onmouseover = canHandler;
    this.trashCan.onmouseleave = canHandler;
  }

  render() {
    this.element.innerHTML = '';
    this.addPapers();
    this.drawTrashCan('closed');
    this.appContainer.append(this.element);
    this.addListener();
  }
}

export default TrashCan;
