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
      const leftPosition =
        220 + Math.round(Math.random() * 300 + Math.random() * 200);
      paper.classList.add('paper');
      paper.style.top = `${topPosition}px`;
      paper.style.left = `${leftPosition}px`;
      papers.push(paper);
      amount -= 1;
    }

    this.element.append(...papers);
  }

  addListener() {
    const canHandler = () => {
      this.trashCan.classList.toggle('opened');
    };

    this.trashCan.onmouseover = canHandler;
    this.trashCan.onmouseleave = canHandler;
    this.dragAndDrop();
  }

  dragAndDrop() {
    const downHandler = (e) => {
      const paper = e.target;
      console.dir(this.appContainer)
      console.log(this.appContainer.getBoundingClientRect())
      if (paper.matches('.paper')) {
        console.dir(this.element)
        const shiftX = e.clientX - paper.getBoundingClientRect().left + this.element.offsetLeft;
        const shiftY = e.clientY - paper.getBoundingClientRect().top + this.element.offsetTop;
        paper.ondragstart = false;
        paper.style.zIndex = 1000;

        const moveAt = (pageX, pageY) => {
          paper.style.left = `${pageX - shiftX}px`;
          paper.style.top = `${pageY - shiftY}px`;
        };

        moveAt(e.pageX, e.pageY);

        const moveHandler = (event) => {
          moveAt(event.pageX, event.pageY);
        };

        document.onmousemove = moveHandler;
      }
    };

    const upHandler = (e) => {
      const { target } = e;
      if (target.matches('.paper')) {
        target.style.zIndex = 1;
        document.onmousemove = false;
      }
    };

    this.appContainer.onmousedown = downHandler;
    this.appContainer.onmouseup = upHandler;
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
