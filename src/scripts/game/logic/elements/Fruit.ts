import EventEmitter from 'eventemitter3';
import Align from '../../systems/Align';
import { FruitEnumType } from './FruitTypes';
import Level, { LevelEvents } from './Level';

export default class Fruit {
  readonly events = new EventEmitter();

  private _state: 'falling' | 'collected' | 'dropped' = 'falling';
  private _fruitType: FruitEnumType = 'Apple';
  private _x = 0;
  private _y = 0;
  private _z = 0;

  // pixels per second
  private _fallingSpeed = 150;

  constructor(private level: Level) {}

  startFalling(fruitType: FruitEnumType) {
    this._fruitType = fruitType;

    const m = 0.15;

    // TODO: 'level' size should be provided from upper level
    this._x = Align.left + m + Math.random() * (1 - m * 2) * Align.width;
    this._y = Align.top + m + Math.random() * (1 - m * 2) * Align.height;

    this._z = Math.random() * 200 + 500;
    this._y -= this._z;

    this.level.events.emit(LevelEvents.FruitSpawned, this);
  }

  collect() {
    if (this._state !== 'falling') throw Error('Cannot collect not falling Fruit');
    this._state = 'collected';
    this.level.events.emit(LevelEvents.FruitCollected, this);
    this.events.emit(LevelEvents.FruitCollected, this);
  }

  drop() {
    if (this._state !== 'falling') throw Error('Cannot drop not falling Fruit');
    this._state = 'dropped';
    this.level.events.emit(LevelEvents.FruitDropped, this);
    this.events.emit(LevelEvents.FruitDropped, this);
  }

  update(delta: number = 0) {
    this._y += (delta / 1000) * this._fallingSpeed;
    this._z -= (delta / 1000) * this._fallingSpeed;
  }

  get state() {
    return this._state;
  }

  get fruitType() {
    return this._fruitType;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }
}
