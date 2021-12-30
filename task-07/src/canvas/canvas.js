import PictureOne from './PictureOne';
import PictureTwo from './PictureTwo';
import PictureThree from './PictureThree';

class Canvas {
  constructor() {
    this.element = document.createElement('canvas');
    this.element.id = 'canvas';
    this.element.classList.add('canvas');
    this.element.width = 1024;
    this.element.height = 600;

    this.ctx = this.element.getContext('2d');

    this.PictureOne = new PictureOne(this.ctx);
    this.PictureTwo = new PictureTwo(this.ctx);
    this.PictureThree = new PictureThree(this.ctx);
  }

  draw() {
    this.PictureOne.draw(100, 200);
    this.PictureTwo.draw(250, 200);
    this.PictureThree.draw(600, 200);
  }
}

export default Canvas;
