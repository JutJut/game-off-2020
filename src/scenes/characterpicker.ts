import { availableCharacters } from '../config/characterConfig';
import { OurScenes } from '../enums/scenes';
import { PlayerService } from '../services/player.service';

import {count} from './menu';

export default class CharacterPickerScene extends Phaser.Scene {
  backgroundImage: Phaser.GameObjects.Image;
  playerService: PlayerService;

  constructor() {
    super({
      key: OurScenes.CHARACTER_PICKER,
    });
    this.playerService = PlayerService.Instance;
  }

  create() {

    this.add.image(0, 0, 'dark_forrest').setScale(1.7);
    console.log(this.scene.isActive('StartMenu'))
    const spacing = 100;
    const characters = this.physics.add.staticGroup();

    availableCharacters.forEach((characterConfig, index) => {
      const character = this.add
        .image(this.scene.systems.scale.width / 2, spacing * (index + 1), characterConfig.key)
        .setScale(1)
        .setInteractive();
      character.on('pointerdown', () => {
        this.playerService.player = characterConfig;
        this.scene.start(OurScenes.GAME);
      });
      characters.add(character);
    });
    console.log(this.scene.manager.getScene(OurScenes.START_MENU));
  }

}


