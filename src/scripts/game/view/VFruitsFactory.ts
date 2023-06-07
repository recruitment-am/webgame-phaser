import EventEmitter from 'eventemitter3';
import GameScene from '../GameScene';
import Fruit from '../logic/elements/Fruit';
import { LevelEvents } from '../logic/elements/Level';
import { logAs } from '../systems/Logger';
import VFruit from './VFruit';

export const FruitsGeneratorEvents = {
  NewFruit: 'NewFruit',
};

export default class VFruitsFactory {
  readonly events = new EventEmitter();
  readonly scene: GameScene;

  private pool?: VFruit[];

  constructor(
    scene: GameScene,
    layer: Phaser.GameObjects.Container,
    shadowsLayer?: Phaser.GameObjects.Container
  ) {
    this.scene = scene;
    const putBackToPool = (fruit: VFruit) => {
      this.pool?.unshift(fruit);
    };

    const pool = new Array(20).fill(null).map(() => {
      const fruit = new VFruit(scene, putBackToPool);
      layer.add(fruit);

      // put shadows in the dedicated layer
      (shadowsLayer ?? layer).addAt(fruit.shadow, 0);

      return fruit;
    });

    this.pool = pool;

    scene.gameLoop.level.events.on(LevelEvents.FruitSpawned, this.handleFruitSpawned, this);
  }

  private handleFruitSpawned(fruit: Fruit) {
    const vFruit = this.pool?.pop();
    if (!vFruit) {
      logAs('VFruitsFactory', 'No more VFruits in pool');
      return;
    }

    vFruit.showFor(fruit);
  }
}
