import { mainCharacter } from '../config/characterConfig';
import { OurScenes } from '../enums/scenes';

export default class LoadScene extends Phaser.Scene {
  startText: Phaser.GameObjects.Text;
  graphics: Phaser.GameObjects.Graphics;
  newGraphics: Phaser.GameObjects.Graphics;
  backgroundImage1;
  backgroundImage2;

  constructor() {
    super({
      key: OurScenes.LOAD,
    });
  }

  preload() {

    // Background images
    this.backgroundImage1 = this.load.image('background1', './assets/backgrounds/background1.png');
    this.backgroundImage2 = this.load.image('background2', './assets/backgrounds/background2.png');

    // Game characters
      for (const [_, value] of Object.entries(mainCharacter.spriteSheets)) {
        this.load.spritesheet(value.key, value.path, {
          frameWidth: value.frameWidth,
          frameHeight: value.frameHeight,
        });
      }


    // Menu assets
    this.load.image('button_start', './assets/Menu/Large-Buttons/Large-Buttons/PlayButton.png');
    this.load.image('button_settings', './assets/Menu/Large-Buttons/Large-Buttons/SettingsButton.png');
    this.load.image('button_continue', './assets/Menu/Large-Buttons/Large-Buttons/ContinueButton.png');
    this.load.image('button_audio', './assets/Menu/Square-Buttons/Square-Buttons/AudioSquareButton.png');

    this.load.image('moonshot', './assets/tilemap/tiles/main.png');
    this.load.image('backgroundLayer', './assets/tilemap/tiles/background_layer.png');
    this.load.tilemapTiledJSON('tilemap', './assets/tilemap/moonshot.json');

    // LoadingBar
    const graphics = this.add.graphics();
    const newGraphics = this.add.graphics();
    const progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
    const progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRectShape(progressBar);

    newGraphics.fillStyle(0x3587e2, 1);
    newGraphics.fillRectShape(progressBarFill);

    const loadingText = this.add.text(250, 260, 'Loading: ', { fontSize: '32px', fill: '#FFF' });

    this.load.on('progress', (percentage) => {
      newGraphics.clear();
      newGraphics.fillStyle(0x3587e2, 1);
      newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40));

      loadingText.setText('Loading: ' + (percentage * 100).toFixed(2) + '%');
    });

    this.load.on('complete', () => {
      this.scene.start(OurScenes.START_MENU);
    });
  }
}
