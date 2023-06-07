import { logAs } from '../systems/Logger';
import GameLoop from './GameLoop';

export default class LivesCounter {
  private _lives = 10;
  get lives() {
    return this._lives;
  }

  constructor(private loop: GameLoop) {}

  update() {
    const fruitsFallen = this.loop.collisions.checkForFalls();
    fruitsFallen.forEach((fruit) => {
      fruit.drop();
      this._lives -= 1;

      logAs('LivesCounter', 'Lost a life. To go: ' + this._lives);
    });

    if (this._lives <= 0) {
      logAs('LivesCounter', 'Lives count dropped to 0');
      this.loop.gameOver();
    }
  }
}
