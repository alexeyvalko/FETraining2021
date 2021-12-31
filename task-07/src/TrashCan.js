class TrashCan {
  constructor(appContainer) {
    this.element = document.createElement('div');
    this.element.id = 'trash';
    this.element.classList.add('trash');
    this.appContainer = appContainer;

    this.trashCan = document.createElement('div');

    this.paper = document.createElement('div');
    this.paper.classList.add('paper');

    this.trashStack = [];
  }

  drawTrashCan(state) {
    this.element.append(this.trashCan);
    this.trashCan.classList.add('trashcan', state);
  }

  addPapers(number) {
    let amount = number;
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
      if (this.trashStack.length > 0) {
        this.trashCan.classList.toggle('opened');
      }
    };

    this.trashCan.onmouseover = canHandler;
    this.trashCan.onmouseleave = canHandler;
    this.dragAndDrop();
  }

  getBelowElement(el, event) {
    const currentElement = el;
    currentElement.hidden = true;
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    currentElement.hidden = false;
    return elemBelow;
  }

  dragAndDrop() {
    const downHandler = (e) => {
      let { target } = e;
      let shiftX =
        e.clientX -
        target.getBoundingClientRect().left +
        this.element.offsetLeft;
      let shiftY =
        e.clientY - target.getBoundingClientRect().top + this.element.offsetTop;

      const moveAt = (pageX, pageY) => {
        target.style.left = `${pageX - shiftX}px`;
        target.style.top = `${pageY - shiftY}px`;
      };
      const moveHandler = (event) => {
        moveAt(event.pageX, event.pageY);
        const elemBelow = this.getBelowElement(target, event);
        if (elemBelow.matches('.trashcan')) {
          this.trashCan.classList.add('opened');
        } else {
          this.trashCan.classList.remove('opened');
        }
      };

      if (target.matches('.paper')) {
        console.dir(this.element);
        target.ondragstart = () => false;
        target.style.zIndex = 1000;
        moveAt(e.pageX, e.pageY);
        document.onmousemove = moveHandler;
      }

      if (target.matches('.trashcan') && this.trashStack.length > 0) {
        this.trashStack.pop();
        const paper = document.createElement('div');
        paper.classList.add('paper');
        this.element.append(paper);
        target = paper;
        target.style.left = `${e.pageX - shiftX + target.offsetWidth / 2}px`;
        target.style.top = `${e.pageY - shiftY + target.offsetHeight / 2}px`;
        shiftX =  e.clientX - target.getBoundingClientRect().left +
        this.element.offsetLeft;shiftY =
        e.clientY - target.getBoundingClientRect().top + this.element.offsetTop;
        moveAt(e.pageX, e.pageY);
        document.onmousemove = moveHandler;
      }
    };

    const upHandler = (e) => {
      const paper = e.target;
      const belowElement = this.getBelowElement(paper, e);
      if (paper.matches('.paper')) {
        paper.style.zIndex = 1;
        document.onmousemove = false;
        if (belowElement.matches('.trashcan')) {
          this.trashStack.push(true);
          paper.remove();
          this.trashCan.classList.remove('opened');
        }
      }
    };

    this.appContainer.onmousedown = downHandler;
    this.appContainer.onmouseup = upHandler;
  }

  render() {
    this.element.innerHTML = '';
    this.addPapers(5);
    this.drawTrashCan('closed');
    this.appContainer.append(this.element);
    this.addListener();
  }
}

export default TrashCan;
