import PictureOne from "./PictureOne";
import PictureTwo from "./PictureTwo";

class Canvas {
  constructor() {
    this.element = document.createElement('canvas');
    this.element.id = 'canvas';
    this.element.classList.add('canvas');
    this.element.width = 1024;
    this.element.height = 600;

    this.ctx = this.element.getContext('2d');

    this.PictureOne = new PictureOne(this.ctx)
    this.PictureTwo = new PictureTwo(this.ctx)
  }

  draw() {
    this.PictureOne.draw(100, 200)
    this.PictureTwo.draw(250, 200)
  }

  

  custom() {
    this.ctx.fillStyle = 'rgb(200,0,0)';
    this.ctx.fillRect(10, 10, 100, 100);
    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.ctx.fillRect(30, 30, 100, 100);
    this.drawRectangle();
  }

  drawRectangle() {
    this.ctx.beginPath();
    this.ctx.moveTo(275, 50);
    this.ctx.lineTo(300, 75);
    this.ctx.lineTo(300, 25);
    this.ctx.fill();
  }
}

export default Canvas;
