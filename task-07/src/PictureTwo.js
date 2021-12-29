class PictureTwo {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.strokeStyle = 'rgba(100,0,0, 0.8)';
    this.drawWheel(x, y);
    this.drawWheel(x + 130, y);
    this.drawFrame(x, y);
  }

  drawWheel(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(200,0,0, 0.5)';
    this.ctx.moveTo(x + 40, y);
    this.ctx.arc(x, y, 40, 0, Math.PI * 2, true); // Внешняя окружность
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawFrame(xCord, yCord) {
    const x = xCord;
    const y = yCord;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 60, y);
    this.ctx.lineTo(x + 110, y - 50);
    this.ctx.lineTo(x + 40, y - 50);
    this.ctx.lineTo(x, y);
    this.ctx.moveTo(x + 100, y - 80);
    this.ctx.lineTo(x + 130, y);
    this.ctx.moveTo(x + 100, y - 80);
    this.ctx.lineTo(x + 120, y - 100);
    this.ctx.moveTo(x + 100, y - 80);
    this.ctx.lineTo(x + 70, y - 80);

    this.ctx.moveTo(x + 35, y - 60);
    this.ctx.lineTo(x + 60, y);
    this.ctx.moveTo(x + 25, y - 60);
    this.ctx.lineTo(x + 50, y - 60);

    this.ctx.moveTo(x + 70, y);
    this.ctx.arc(x + 60, y, 10, 0, Math.PI * 2, true); // Внешняя окружность
    this.ctx.moveTo(x + 69, y+5);
    this.ctx.lineTo(x + 80, y + 12);
    this.ctx.moveTo(x + 52, y - 5);
    this.ctx.lineTo(x + 40, y - 15);
    this.ctx.stroke();
  }
}

export default PictureTwo;
