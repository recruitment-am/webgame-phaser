export default class Knight {
  x = 0;
  y = 0;

  speedX: number = 0;
  speedY: number = 0;

  private maxSpeed: number = 600;
  private movingInertia: number = 6;

  // controlled by user input
  moveY: number = 0;
  moveX: number = 0;

  constructor() {}

  update(delta: number) {
    this.x += (delta / 1000) * this.speedX;
    this.y += (delta / 1000) * this.speedY;

    this.speedX = (this.speedX * this.movingInertia + this.moveX * this.maxSpeed) / (this.movingInertia + 1);
    this.speedY = (this.speedY * this.movingInertia + this.moveY * this.maxSpeed) / (this.movingInertia + 1);
  }
}
