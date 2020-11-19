<script lang="typescript">
  import Phaser from 'phaser';
  import GameScene from './scenes/game';
  import LoadScene from './scenes/load';
  import StartMenuScene from './scenes/menu';

  import { sceneName } from './services/CurrentScene/currentScene.service';

  let currentSceneName;

  const config = {
    type: Phaser.AUTO,
    scale: {
      width: 1500,
      height: 800,
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

  const unsubscribe = sceneName.subscribe((value) => {
    currentSceneName = value;
  });

  function onPlay() {
    
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

{#if currentSceneName == 'Start Menu'}
  <main>
     <div><button on:click={onPlay}> Play </button></div>
  </main>
{/if}
<h1>Scene is: {currentSceneName}</h1>