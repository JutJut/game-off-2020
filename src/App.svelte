<script lang="typescript">
  
  import Phaser from 'phaser';

  import LoadScene from './scenes/load';
  import StartMenuScene from './scenes/menu';  
  import GameScene from './scenes/game';

  import {count} from '../src/scenes/menu';

  export let count_value;
  
  const config = {
    type: Phaser.AUTO,
    scale: {
      // width: 1500,
      // height: 800,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    }, 
    scene: [LoadScene, StartMenuScene, GameScene],
    parent: 'parent',
    dom: {
      createContainer: true
    },  
    backgroundColor: '#2d2d2d',
    physics: {
      default: 'arcade',
      arcade: {
      x: 0,
      y: 0,     
      width: 3500,
      height:800,
      gravity: { y: 300 },
      debug: false,
      fps: 60,
      checkCollision: {
        up: true,
        down: true,
        left: true,
        right: true,
      },
      timeScale: 1,
      },
    }
  }

  const game = new Phaser.Game(config);
  function increment() {
    count.update(n => n + 1);
  }	

  const unsubscribe = count.subscribe(value => {
    count_value = value;
  });
</script>

<main>
  <button on:click={increment}>
    +
  </button>
  <h1>Current game state is: {count_value}
  
  </h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>