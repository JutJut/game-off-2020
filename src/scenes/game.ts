import { movementKeys } from '../enums/keyboard';
import { OurScenes } from '../enums/scenes';
import { KeyboardService } from '../services/keyboard.service';
import { PlayerService } from '../services/player.service';
// import App from '../App.svelte';

export default class GameScene extends Phaser.Scene {
  backgroundImage: Phaser.GameObjects.Image;
  platforms;
  player;
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

    // IMAGES | TILES
    this.backgroundImage = this.add.image(0, 0, 'dark_forrest').setScale(2);
    this.backgroundImage.scrollFactorX = 0;
    this.backgroundImage.scrollFactorY = 0;
    const arrayOfHarmfulTiles = [];
    const tilemap = this.add.tilemap('tilemap');
    const terrain = tilemap.addTilesetImage('terrain');
    const topLayer = tilemap.createStaticLayer('top', [terrain], 0, 0);

    // PLAYER AND ANIMATIONS
    this.player = this.physics.add
      .sprite(500 / 2, 50, this.playerService.player.key)
      .setScale(this.playerService.player.body.display.scale);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    // Add player collision with platforms
    this.physics.add.collider(this.player, topLayer);
    topLayer.setCollisionByProperty({ isPlatform: true });
       
    for (const [key, value] of Object.entries(tilemap.tilesets[0].tileProperties)) {          
      topLayer.layer.data.forEach(function(row) {
        row.forEach(function(tile) {
          if (tile.index === Number(key) && value.isJumpablePlatform) {            
            tile.faceTop = true;
            tile.collideUp = true;
          }
          if (tile.index === Number(key) && value.isHarmful) {                    
            arrayOfHarmfulTiles.push(tile);            
          }
        })
      })     
    }    

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
    this.cameras.main.setBounds(0, 0, 3500, 800);
    this.cameras.main.startFollow(this.player, true, 1, 1, 0, +64);

    this.jumpCounter = 0;
    this.canJump = true; 

    this.harmfulTiles = arrayOfHarmfulTiles;
  }

  update() {
   
    this.didPressJump = Phaser.Input.Keyboard.JustUp(this.keyboardInputs.W);

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
        if (this.keyboardInputs.SHIFT.isDown) {
          this.player.body.setVelocityX(300);
          this.player.play(this.playerService.player.animations.RUN.key, true);
        } else {
          this.player.play(this.playerService.player.animations.WALK.key, true);
          this.player.body.setVelocityX(200);
        }
      } else {
        this.player.play(this.playerService.player.animations.JUMP.key, true);
        this.player.body.setVelocityX(200);
        if (this.keyboardInputs.SHIFT.isDown) {
          this.player.body.setVelocityX(300);
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
        if (this.keyboardInputs.SHIFT.isDown) {
          this.player.body.setVelocityX(-300);
          this.player.play(this.playerService.player.animations.RUN.key, true);
        } else {
          this.player.play(this.playerService.player.animations.WALK.key, true);
          this.player.body.setVelocityX(-200);
        }
      } else {
        this.player.play(this.playerService.player.animations.JUMP.key, true);
        this.player.body.setVelocityX(-200);
        if (this.keyboardInputs.SHIFT.isDown) {
          this.player.body.setVelocityX(-300);
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
}
