class PictureThree {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = 'rgba(0,200,0, 1)';
    this.ctx.strokeStyle = 'rgba(0,0,0, 1)';
    this.drawRoof(x, y);
    this.drawHouse(x, y);
    this.drawDoor(x - 50, y + 130);
    this.drawWindow(x - 80, y + 30);
    this.drawWindow(x + 10, y + 30);
    this.drawWindow(x + 10, y + 130);

    this.drawChimney(x + 50, y - 80)
  }

  drawRoof(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.beginPath();
    this.ctx.moveTo(x - 100, y);
    this.ctx.lineTo(x + 100, y);
    this.ctx.lineTo(x, y - 85);
    this.ctx.lineTo(x - 100, y);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawChimney(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.fillStyle = 'rgba(0,200,0, 1)';
    this.ctx.fillRect(x -15, y, 30, 60);
    this.ctx.beginPath();
    this.ctx.moveTo(x + 15, y);
    this.ctx.ellipse(x, y, 15, 5, Math.PI * 2, 0, Math.PI * 2);
    this.ctx.moveTo(x + 15, y);
    this.ctx.lineTo(x + 15, y + 60);
    this.ctx.moveTo(x - 15, y);
    this.ctx.lineTo(x - 15, y + 60);
    this.ctx.stroke()
    this.ctx.fill()


  }

  drawHouse(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.beginPath();
    this.ctx.moveTo(x - 100, y);
    this.ctx.fillRect(x - 100, y, 200, 200);
    this.ctx.strokeRect(x - 100, y, 200, 200);
  }

  drawDoor(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.beginPath();
    this.ctx.moveTo(x - 30, y + 10);
    this.ctx.ellipse(x, y + 10, 30, 20, Math.PI, 0, Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x - 30, y + 10);
    this.ctx.lineTo(x - 30, y + 70);
    this.ctx.moveTo(x + 30, y + 10);
    this.ctx.lineTo(x + 30, y + 70);
    this.ctx.moveTo(x, y - 10);
    this.ctx.lineTo(x, y + 70);

    this.ctx.moveTo(x + 14, y + 50);
    this.ctx.arc(x + 10, y + 50, 4, 0, Math.PI * 2, true);
    this.ctx.moveTo(x - 6, y + 50);
    this.ctx.arc(x - 10, y + 50, 4, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }

  drawWindow(xCord, yCord) {
    const x = xCord;
    const y = yCord;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(0,0,0, 1)';
    this.ctx.moveTo(x, y);
    this.ctx.fillRect(x, y, 30, 20);
    this.ctx.fillRect(x + 32, y, 30, 20);
    this.ctx.fillRect(x + 32, y + 22, 30, 20);
    this.ctx.fillRect(x, y + 22, 30, 20);
  }
}

export default PictureThree;
