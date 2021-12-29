class PictureOne {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.drawFace(x, y);
    this.drawHat(x, y);
  }

  drawFace(xCord, yCord) {
    const x = xCord;
    const y = yCord;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(200,0,0, 0.5)';
    this.ctx.moveTo(x + 60, y);
    this.ctx.arc(x, y, 60, 0, Math.PI * 2, true); // Внешняя окружность
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y + 40);
    this.ctx.ellipse(x, y + 30, 10, 20, Math.PI / 2, 0, 2 * Math.PI); // рот
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y - 10); // нос
    this.ctx.lineTo(x - 8, y + 10);
    this.ctx.lineTo(x, y + 8);
    this.ctx.stroke();

    this.drawEye(x + 10, y - 10); // глаз
    this.drawEye(x - 40, y - 10); // глаз
  }

  drawHat(xCord, yCord) {
    const x = xCord;
    const y = yCord - 120;

    this.ctx.fillStyle = 'rgb(200,0,0)';

    this.ctx.beginPath();
    this.ctx.moveTo(x + 75, y + 80);
    this.ctx.ellipse(x, y + 80, 75, 20, Math.PI * 2, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.fillRect(x - 26, y, 52, 70);

    this.ctx.beginPath();
    this.ctx.moveTo(x + 25, y + 70);
    this.ctx.lineTo(x + 25, y);
    this.ctx.moveTo(x - 25, y + 70);
    this.ctx.lineTo(x - 25, y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y + 10);
    this.ctx.ellipse(x, y, 10, 25, Math.PI / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(x + 25, y + 70);
    this.ctx.ellipse(x, y + 70, 25, 15, Math.PI * 2, 0, Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawEye(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    const eye = new Path2D();
    const eyeBall = new Path2D();
    this.ctx.fillStyle = 'rgb(0,0,0)';
    eye.ellipse(x + 15, y, 6, 10, Math.PI / 2, 0, 2 * Math.PI);
    this.ctx.beginPath();
    eyeBall.moveTo(x + 18, y);
    eyeBall.arc(x + 15, y, 4, 0, Math.PI * 2, true);
    this.ctx.fill(eyeBall);
    this.ctx.stroke(eye);
  }
}

export default PictureOne;
