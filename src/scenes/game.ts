import Phaser from 'phaser';

import { mainCharacter } from '../config/characterConfig';
import { movementKeys } from '../enums/keyboard';
import { OurScenes } from '../enums/scenes';
import { KeyboardService } from '../services/keyboard.service';
import { PlayerService } from '../services/player.service';
import { gameState } from '../store';

let timedDashCooldown;
let timedEvent;
let text;

export default class GameScene extends Phaser.Scene {
  backgroundImage1: Phaser.GameObjects.TileSprite;
  backgroundImage2: Phaser.GameObjects.TileSprite;
  platforms;
  player;
  camera;
  playerService: PlayerService;
  keyboardInputs;
  keyboardService: KeyboardService;
  canPlayerJump: boolean;
  canPlayerDash: boolean;
  jumpCounter: number;
  playerDefaultGravityY: number;
  elevators: any;
  objectLayer: any;

  constructor() {
    super({
      key: OurScenes.GAME,
    });
  }

  create() {
    this.keyboardService = new KeyboardService(this.input);
    this.playerService = PlayerService.Instance;
    this.playerService.player = mainCharacter;
    this.game.input.mouse.capture = true;
    // IMAGES | TILES
    const {width, height} = this.sys.game.scale.gameSize;

    //Starting values
    timedDashCooldown = this.playerService.player.helpers.dashPercentage;
    this.jumpCounter = 0;   
    this.playerDefaultGravityY = 300;
    text = this.add.text(0, 0, '');  
    //Set game state
    gameState.set({
      scene: this.scene.manager.getScene(this.scene.key).scene.key,
      playerHealth: this.playerService.player.body.health,
      dashCooldownPercentage: timedDashCooldown,
      dashOverlayClass: 'dashHighlight',
      canDash: true,
      canJump: true
    })

    // Background images
    this.backgroundImage1 = this.add.tileSprite(0, 0, width, height, 'background1').setOrigin(0,0).setScrollFactor(0).setScale(1.5);
    this.backgroundImage2 = this.add.tileSprite(0, 0, width, height, 'background2').setOrigin(0,0).setScrollFactor(0).setScale(1.5);

    // Tile layers
    const tilemap = this.add.tilemap('tilemap');
    const moonshot = tilemap.addTilesetImage('moonshot');
    const background = tilemap.addTilesetImage('backgroundLayer');
    const front = tilemap.addTilesetImage('frontLayer');

    const mainLayer = tilemap.createStaticLayer('main', [moonshot], 0, 0);
    const backgroundLayer = tilemap.createStaticLayer('backgroundLayer', [background], 0, 0);

    const deathLayer = tilemap.createDynamicLayer('deathLayer', [background], 0, 0);
    
    //Objects
    this.objectLayer = tilemap.createFromObjects('tileObjects', 57, {key: 'elevator'});
    this.objectLayer.forEach(object => {
      this.physics.world.enable(object);
      object.body.allowGravity = false;
      object.body.immovable=true;
      console.log(object);
    });

    // PLAYER AND ANIMATIONS
    this.player = this.physics.add
      .sprite(2*32, 85*32, this.playerService.player.key)
      .setBounce(0.2)
      .setCollideWorldBounds(true)
      .setOffset(30,35);
    this.player.body.setGravityY(this.playerDefaultGravityY);

    // Front layer has to be initialized after player to obtain highest order
    const frontLayer = tilemap.createStaticLayer('frontLayer', [front], 0,0);

    // Add death layer ovelap
    this.physics.add.overlap(
      this.player,
      deathLayer,
      function onCollide (_sprite, tile) {
        this.player.play(this.playerService.player.animations.DEATH.key, false);
        this.restartGame();
      },
      function process (_sprite, tile: any) {
        return (tile.index !== -1);
      },
      this
    );

    // Add player collision with platforms
    this.physics.add.collider(this.player, mainLayer);
    this.physics.add.collider(this.player, this.objectLayer, null, null, this);
    this.physics.add.collider(mainLayer, this.objectLayer, null, null, this);
    mainLayer.setCollisionByProperty({ isPlatform: true });

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
    this.camera = this.cameras.main
                  .setBounds(0, 0, 12800, 3200)
                  .startFollow(this.player, true, 1, 1, 0, +64);   

    const unsubscribe = gameState.subscribe((value) => {
      this.canPlayerDash = value.canDash;
      this.canPlayerJump = value.canJump;
    });

    text = this.add.text(0, 0, '');
  }

  update() {
    this.backgroundImage1.tilePositionX = this.camera.scrollX * 0.3;
    this.backgroundImage2.tilePositionX = this.camera.scrollX * 0.5;

    if (this.player.body.onFloor()) {
      this.jumpCounter = 0;
      gameState.update(state=> ({
        ...state,
        canJump: true
      }));
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
          if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT,250) && this.canPlayerDash) {
            this.player.play(this.playerService.player.animations.DASH.key, true);
            this.player.body.setVelocityX(400);
            this.dashCooldown();
          }
          if(this.game.input.activePointer.leftButtonDown()) {
            this.player.play(this.playerService.player.animations.ATTACK.key, true);
          }
      } else {
        this.player.play(this.playerService.player.animations.JUMP.key, true);
        this.player.body.setVelocityX(200);
        if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT,250)  && this.canPlayerDash) {
          this.player.play(this.playerService.player.animations.DASH.key, true);
          this.player.body.setVelocityX(400);
          this.dashCooldown();
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
          if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT,250) && this.canPlayerDash) {
            this.player.play(this.playerService.player.animations.DASH.key, true);
            this.player.body.setVelocityX(-400);
            this.dashCooldown();
          }
      } else {
        this.player.play(this.playerService.player.animations.JUMP.key, true);
        this.player.body.setVelocityX(-200);
        if(Phaser.Input.Keyboard.DownDuration(this.keyboardInputs.SHIFT,250) && this.canPlayerDash) {
          this.player.play(this.playerService.player.animations.DASH.key, true);
          this.player.body.setVelocityX(-400);
          this.dashCooldown();
        }
      }
    }

    if (Phaser.Input.Keyboard.JustUp(this.keyboardInputs.A)) {
      this.player.body.setVelocityX(0);
      this.player.play(this.playerService.player.animations.IDLE.key, true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyboardInputs.W) && this.canPlayerJump) {
      this.player.play(this.playerService.player.animations.JUMP.key, true);
      this.player.setVelocityY(-300);
      this.jumpCounter++;
      if (this.jumpCounter === 2) {
        gameState.update(state=> ({
          ...state,
          canJump: false
        }));
      }
    }
  }

  restartGame() {
    this.input.keyboard.removeAllKeys();
    setTimeout(() => {
      this.scene.start(OurScenes.GAME);
    }, 3000);
  }

  dashCooldown() {
    timedEvent = this.time.addEvent({ delay: 500, callback: this.onDashCooldownEvent, callbackScope: this, repeat: 5 });
  }

  onDashCooldownEvent () {
    text.setText(timedEvent.getOverallProgress().toFixed(2).split(".")[1]);
    timedDashCooldown = text.text;
    gameState.update(state=> ({
      ...state,
      canDash: timedDashCooldown == 0 ? true : false,
      dashOverlayClass: timedDashCooldown == 0 ? 'dashHighlight' : 'dashOff',
      dashCooldownPercentage: timedDashCooldown == 0 ? 100 : timedDashCooldown,
    }));
  }
}
