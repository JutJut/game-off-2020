<script lang="typescript">
  import Phaser from 'phaser';
  import GameScene from './scenes/game';
  import LoadScene from './scenes/load';
  import StartMenuScene from './scenes/menu';
  import { jumpCount } from './services/jumpCounter.service';

  let visible = false;

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
        width: 3500,
        height: 800,
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
    },
  };

  const game = new Phaser.Game(config);

  let count_value;

  const unsubscribe = jumpCount.subscribe((value) => {
    count_value = value;
    if (count_value > 10) {
      visible = true;
      setInterval(() => {
        visible = false;
      }, 5000);
    }
  });
</script>

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
    position: absolute;
    margin-top: -50%;
    margin-left: 5%;
  }

  .testClass {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    position: absolute;
    margin-top: -20%;
    margin-left: 5%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<h1>Jump counter: {count_value}</h1>
{#if visible}
  <p class="testClass">Super Jumper!!</p>
{/if}
<main>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
