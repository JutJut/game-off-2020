import Phaser from 'phaser';
import { OurScenes } from '../enums/scenes';
import { sceneName } from '../services/CurrentScene/currentScene.service';

export default class StartMenuScene extends Phaser.Scene {
  backgroundImage: Phaser.GameObjects.Image;
  startText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: OurScenes.START_MENU,
    });
  }

  create() {
    sceneName.set(this.scene.manager.getScene(this.scene.key).scene.key);
    this.backgroundImage = this.add.image(0, 0, 'background1').setScale(1.7);
    const width = this.game.config.width as number;
    const height = this.game.config.height as number;
    const startButton = this.add
      .image(width / 2.1, height / 2.3, 'button_start')
      .setInteractive()
      .setScale(0.4);
    const audioButton = this.add
      .image(width / 15, height / 10, 'button_audio')
      .setInteractive()
      .setScale(0.4);

    startButton.on('pointerdown', () => {
      this.scene.start(OurScenes.GAME);
    });
    audioButton.on('pointerdown', () => {
      return;
    });
  }
}