<script lang="typescript">
  import Phaser from 'phaser';
  import GameScene from './scenes/game';
  import LoadScene from './scenes/load';
  import StartMenuScene from './scenes/menu';

  let isStarted = false;

  const config = {
    type: Phaser.AUTO,
    scale: {
      width: 1500,
      height: 800,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
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
        width: 400 * 32,
        height: 100 * 32,
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

  function onPlay() {
    isStarted = true;
  }
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
</style>

{#if !isStarted}
  <main>
    <div><button on:click={onPlay}> Play </button></div>
  </main>
{/if}
