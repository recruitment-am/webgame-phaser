import { GameState, gameEvents } from '../GameContext';
import { logAs } from '../systems/Logger';
import GameLoop from './GameLoop';

export default class PointsCounter {
  get score() {
    return this._score;
  }

  constructor(private loop: GameLoop, private _score: number = 0) {
    gameEvents.on('addScore', ({ state }: { state: GameState }) => {
      this._score = state.score;
    });
  }

  update() {
    // collects
    const fruitsToCollect = this.loop.collisions.checkForCollisions();
    fruitsToCollect.forEach((fruit) => {
      fruit.collect();

      const points = 50;
      logAs('PointsCounter', `Score: ${this._score + points}`);

      this.loop.dispatch({
        type: 'addScore',
        points,
      });
    });
  }
}
