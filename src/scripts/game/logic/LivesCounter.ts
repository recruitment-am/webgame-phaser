import { GameState, gameEvents } from '../GameContext';
import { logAs } from '../systems/Logger';
import GameLoop from './GameLoop';

export default class LivesCounter {
  get lives() {
    return this._lives;
  }

  constructor(private loop: GameLoop, private _lives: number = 10) {
    gameEvents.on('takeLife', ({ state }: { state: GameState }) => {
      this._lives = state.lives;
    });
  }

  update() {
    const fruitsFallen = this.loop.collisions.checkForFalls();
    fruitsFallen.forEach((fruit) => {
      fruit.drop();
      logAs('LivesCounter', `Lost a life. To go: ${this._lives - 1}`);

      this.loop.dispatch({
        type: 'takeLife',
      });
    });

    if (this._lives <= 0) {
      logAs('LivesCounter', 'Lives count dropped to 0');
      this.loop.gameOver();
    }
  }
}
