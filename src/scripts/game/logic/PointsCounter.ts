import { logAs } from '../systems/Logger';
import GameLoop from './GameLoop';

export default class PointsCounter {
  private _score = 0;
  get score() {
    return this._score;
  }

  constructor(private loop: GameLoop) {}

  update() {
    // collects
    const fruitsToCollect = this.loop.collisions.checkForCollisions();
    fruitsToCollect.forEach((fruit) => {
      fruit.collect();
      this._score += 50;

      logAs('PointsCounter', 'Score: ' + this._score);
    });
  }
}
