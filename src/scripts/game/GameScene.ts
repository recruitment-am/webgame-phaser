import GameLoop from './logic/GameLoop';
import KnightSteering from './logic/KnightSteering';
import Align from './systems/Align';
import { AtlasKeys } from './systems/AtlasKeys';
import SoundSystem from './systems/SoundSystem';
import VFruitsFactory from './view/VFruitsFactory';
import VKnight from './view/VKnight';
import FadeInFx from './view/fx/FadeInFx';

export default class GameScene extends Phaser.Scene {
  private _sounds!: SoundSystem;

  private _gameLoop!: GameLoop;
  get gameLoop() {
    return this._gameLoop;
  }

  preload() {
    Align.init(this);

    // load atlasses
    this.load.atlas(AtlasKeys.Game, 'atlas/game.webp', 'atlas/game.json');

    // load bitmap fonts
    this.load.bitmapFont('arial', 'fonts/arial.png', 'fonts/arial.fnt');
    this.load.bitmapFont('arial-stroke', 'fonts/arial-stroke.png', 'fonts/arial-stroke.fnt');

    // load settings
    this.load.json('default-settings', 'settings.json');

    // load sounds
    this.load.audioSprite('sounds', 'audio/sounds.json', 'audio/sounds.mp3');
  }

  create() {
    const floorLayer = this.add.container();
    const fruitLayer = this.add.container();

    // create game loop with all logic systems
    this._gameLoop = new GameLoop();
    this._gameLoop.level.knight.x = Align.centerX;
    this._gameLoop.level.knight.y = Align.centerY;

    // view elements
    // knight
    const vKnight = new VKnight(this, this._gameLoop.level.knight);
    floorLayer.add(vKnight);
    new KnightSteering(this, this._gameLoop.level.knight);

    // fruits
    new VFruitsFactory(this, fruitLayer);

    // initialize sounds
    this._sounds = new SoundSystem(this.game, 'sounds');

    // fade in
    new FadeInFx(this);

    setTimeout(() => {
      this._gameLoop.start();
    }, 1000);
  }

  update() {
    this._gameLoop.updateTick();
  }

  get sounds() {
    return this._sounds;
  }
}
