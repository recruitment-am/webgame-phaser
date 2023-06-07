import GameScene from '../GameScene';
import Knight from '../logic/elements/Knight';
import { AtlasKeys } from './AtlasKeys';

const AnimKeys = {
  idle: 'idle',
  runDown: 'run down',
  runLeft: 'run left',
  runRight: 'run right',
  runUp: 'run up',
  sliceDown: 'slice down',
  sliceLeft: 'slice left',
  sliceRight: 'slice right',
  sliceUp: 'slice up',
};
type AnimKeysEntry = (typeof AnimKeys)[keyof typeof AnimKeys];

const AnimFramesIndex = {
  idle: 3,
  'run left': 5,
  'run right': 5,
  run: 4,
  slice: 2,
} as Record<string, number | undefined>;

export default class VKnight extends Phaser.GameObjects.Container {
  readonly sprite: Phaser.GameObjects.Sprite;
  currentAnimKey: AnimKeysEntry = AnimKeys.idle;

  constructor(private readonly sc: GameScene, private readonly knight: Knight) {
    super(sc);
    sc.add.existing(this);

    const sprite = sc.add.sprite(0, 0, AtlasKeys.Game);
    this.sprite = sprite;

    Object.values(AnimKeys).forEach((key) => {
      // num of frames per animation
      const end = AnimFramesIndex[key] ?? AnimFramesIndex[key.split(' ')?.[0] ?? 'idle'] ?? 3;

      const animConfig = {
        key,
        frames: sc.anims.generateFrameNames(AtlasKeys.Game, {
          end,
          suffix: '.png',
          prefix: `knight/knight iso char_${key}_`,
        }),
        repeat: -1,
        frameRate: 10,
      };
      sprite.anims.create(animConfig);
    });

    sprite.scale = 3;
    this.add(sprite);

    this.sprite.play(AnimKeys.idle);

    sc.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    const { knight } = this;
    this.x = knight.x;
    this.y = knight.y;

    // animation/view
    if (Math.abs(knight.speedX) + Math.abs(knight.speedY) < 300) {
      this.switchAnim(AnimKeys.idle);
    } else {
      if (Math.abs(knight.speedX) > 250) {
        this.switchAnim(knight.speedX > 0 ? AnimKeys.runRight : AnimKeys.runLeft);
      } else if (Math.abs(knight.speedY) > 250) {
        this.switchAnim(knight.speedY > 0 ? AnimKeys.runDown : AnimKeys.runUp);
      }
    }
  }

  private switchAnim(anim: AnimKeysEntry) {
    if (this.currentAnimKey === anim) return;
    this.currentAnimKey = anim;

    this.sprite.play(anim);
  }
}
