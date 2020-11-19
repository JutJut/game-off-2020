import Phaser from 'phaser';
import { mainCharacter } from '../config/characterConfig';
import { movementKeys } from '../enums/keyboard';
import { OurScenes } from '../enums/scenes';
import { KeyboardService } from '../services/keyboard.service';
import { PlayerService } from '../services/player.service';

export default class GameScene extends Phaser.Scene {
  backgroundImage1: Phaser.GameObjects.Image;
  backgroundImage2: Phaser.GameObjects.Image;
  platforms;
  player;
  camera;
  playerService: PlayerService;
  keyboardInputs;
  didPressJump: boolean;
  keyboardService: KeyboardService;
  canJump: boolean;
  jumpCounter: number;
  harmfulTiles: any;

  constructor() {
    super({
      key: OurScenes.GAME,
    });
  }

  create() {
    this.keyboardService = new KeyboardService(this.input);
    this.playerService = PlayerService.Instance;
    this.playerService.player = mainCharacter;


    // IMAGES | TILES   
    // this.backgroundImage.scrollFactorX = 0; // TODO: figure out the parallax effect
    // this.backgroundImage.scrollFactorY = 0;

    // IMAGES | TILES
    const {width, height} = this.sys.game.scale.gameSize;

    this.backgroundImage1 = this.add.tileSprite(0, 0, width, height, 'background1').setOrigin(0,0).setScrollFactor(0).setScale(1.5);
    this.backgroundImage2 = this.add.tileSprite(0, 0, width, height, 'background2').setOrigin(0,0).setScrollFactor(0).setScale(1.5);
    const arrayOfHarmfulTiles = [];

    const tilemap = this.add.tilemap('tilemap');
    const moonshot = tilemap.addTilesetImage('moonshot');
    const mainLayer = tilemap.createStaticLayer('main', [moonshot], 0, 0);

    const background = tilemap.addTilesetImage('backgroundLayer');
    const backgroundLayer = tilemap.createStaticLayer('backgroundLayer', [background], 0, 0);

    // PLAYER AND ANIMATIONS
    this.player = this.physics.add
      .sprite(5*32, 90*32, this.playerService.player.key);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setOffset(30,35);
    this.player.body.setGravityY(300);

    // Add player collision with platforms
    this.physics.add.collider(this.player, mainLayer);
    mainLayer.setCollisionByProperty({ isPlatform: true });

    // for (const [key, value] of Object.entries(tilemap.tilesets[0].tileProperties)) {
    //   mainLayer.layer.data.forEach(function(row) {
    //     row.forEach(function(tile) {
    //       if (tile.index === Number(key) && value.isJumpablePlatform) {
    //         tile.faceTop = true;
    //         tile.collideUp = true;
    //       }
    //       if (tile.index === Number(key) && value.isHarmful) {
    //         arrayOfHarmfulTiles.push(tile);
    //       }
    //     })
    //   })
    // }

    for (const [_, value] of Object.entries(this.playerService.player.animations)) {
      this.anims.create({
        key: value.key,
        frames: this.anims.generateFrameNumbers(value.frames.key, {
          start: value.frames.startFrame,
          end: value.frames.endFrame,
        }),
        frameRate: value.frameRate,
        repeat: value.repeat,
      });
    }

    this.player.play(this.playerService.player.animations.IDLE.key);
    this.keyboardInputs = this.input.keyboard.addKeys(movementKeys);
    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, 12800, 3200);
    this.camera.startFollow(this.player, true, 1, 1, 0, +64);

    this.jumpCounter = 0;
    this.canJump = true;

    this.harmfulTiles = arrayOfHarmfulTiles;
  }

  update() {
    this.backgroundImage1.tilePositionX = this.camera.scrollX * 0.3;
    this.backgroundImage2.tilePositionX = this.camera.scrollX * 0.5;

    this.didPressJump = Phaser.Input.Keyboard.JustUp(this.keyboardInputs.W);

    if (Phaser.Input.Keyboard.JustDown(this.keyboardInputs.SPACE)) {
      this.player.play(this.playerService.player.animations.DEATH.key, false);
      console.log("You Dead")
      // TODO trigger GAME OVER or Restart
      return this.RestartGame();
    }

    if (this.player.body.onFloor()) {
      this.jumpCounter = 0;
      this.canJump = true;
      if (this.player.anims.getCurrentKey() === 'JUMP') {
        this.player.play(this.playerService.player.animations.JUMP.key, false);
        this.player.play(this.playerService.player.animations.IDLE.key, true);
      }
    }

    if (this.keyboardInputs.D.isDown) {
      this.player.flipX = false;
      if (this.player.body.onFloor()) {
          this.player.body.setVelocityX(300);
          this.player.play(this.playerService.player.animations.RUN.key, true);
          if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT, 250)) {
            this.player.play(this.playerService.player.animations.DASH.key, true);
            this.player.body.setVelocityX(800);
          }
      } else {
        this.player.play(this.playerService.player.animations.JUMP.key, true);
        this.player.body.setVelocityX(200);
        if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT, 250)) {
          this.player.play(this.playerService.player.animations.DASH.key, true);
          this.player.body.setVelocityX(800);
        }
      }
    }

    if (Phaser.Input.Keyboard.JustUp(this.keyboardInputs.D)) {
      this.player.body.setVelocityX(0);
      this.player.play(this.playerService.player.animations.IDLE.key, true);
    }

    if (this.keyboardInputs.A.isDown) {
      this.player.flipX = true;
      if (this.player.body.onFloor()) {
          this.player.body.setVelocityX(-300);
          this.player.play(this.playerService.player.animations.RUN.key, true);
          if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT, 250)) {
            this.player.play(this.playerService.player.animations.DASH.key, true);
            this.player.body.setVelocityX(-800);
          }
      } else {
        this.player.play(this.playerService.player.animations.JUMP.key, true);
        this.player.body.setVelocityX(-200);
        if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT, 250)) {
          this.player.play(this.playerService.player.animations.DASH.key, true);
          this.player.body.setVelocityX(-800);
        }
      }
    }

    if (Phaser.Input.Keyboard.JustUp(this.keyboardInputs.A)) {
      this.player.body.setVelocityX(0);
      this.player.play(this.playerService.player.animations.IDLE.key, true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyboardInputs.W) && this.canJump) {
      this.player.play(this.playerService.player.animations.JUMP.key, true);
      this.player.setVelocityY(-300);
      this.jumpCounter++;
      if (this.jumpCounter === 2) {
        this.canJump = false;
      }
    }
  }

  RestartGame() {
    this.input.keyboard.removeAllKeys();
    console.log('You died');
    setTimeout(() => {
      this.scene.start(OurScenes.GAME);
    }, 3000);
  }

  OnEvent() {
    this.player.play(this.playerService.player.animations.DASH.key, true);
    this.player.body.setVelocityX(800);
  }

}
