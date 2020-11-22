<script lang="typescript">
  import Phaser from 'phaser';
  import GameScene from './scenes/game';
  import LoadScene from './scenes/load';
  import StartMenuScene from './scenes/menu';
  import PlayerHealthProgressBar from './services/PlayerHealthProgressBar.svelte';
  import { gameState } from './store';

  const config = {
    type: Phaser.AUTO,
    scale: {
      width: 1200,
      height: 600,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.RESIZE,
    },
    scene: [LoadScene, StartMenuScene, GameScene],
    parent: 'parent',
    dom: {
      createContainer: true,
    },
    backgroundColor: '#2d2d2d',
    physics: {
      default: 'arcade',
      arcade: {
        x: 0,
        y: 0,
        width: 12800,
        height: 3200,
        gravity: { y: 300 },
        debug: true,
        fps: 60,
        checkCollision: {
          up: true,
          down: true,
          left: true,
          right: true,
        },
        timeScale: 1,
      },
    },
  };

  const game = new Phaser.Game(config);
</script>

<style>
  main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progressBar {
    position: absolute;
    top: 5%;
    left: 5%;
    bottom: 0;
    right: 0;
  }
</style>

{#if $gameState.scene === 'Start Menu'}
  <main>
    <div><button> Play </button></div>
  </main>
{/if}
{#if $gameState.scene === 'Game'}
  <div class="progressBar">
    <PlayerHealthProgressBar />
  </div>
{/if}
