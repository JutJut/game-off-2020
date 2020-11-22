<script>
  import ProgressBar from '@okrad/svelte-progressbar';
  import { gameState } from './store';

  let playerHealthValue;

  const unsubscribe = gameState.subscribe((value) => {
    playerHealthValue = value.playerHealth;
  });

  let dashClass = 'dashHighlight';
  if (playerHealthValue < 100) {
    dashClass = 'dashOff';
  }
</script>

<style>
  .dashHighlight {
    color: #fff;
    -webkit-animation: dashHighlight 1s ease-in-out infinite alternate;
    -moz-animation: dashHighlight 1s ease-in-out infinite alternate;
    animation: dashHighlight 1s ease-in-out infinite alternate;
  }

  @-webkit-keyframes dashHighlight {
    from {
      text-shadow: 1px #fff, 2px #fff, 3px #e60073, 4px #e60073, 5px #e60073, 6px #e60073, 7px #e60073;
    }

    to {
      text-shadow: 0 0 2px #fff, 0 0 3px #ff4da6, 0 0 4px #ff4da6, 0 0 5px #ff4da6, 0 0 6px #ff4da6, 0 0 7px #ff4da6,
        0 0 8px #ff4da6;
    }
  }

  .dashOff {
    color: #808080;
  }
</style>

<ProgressBar
  style="radial"
  series={[{ perc: playerHealthValue, color: '#660000' }, { perc: 20, color: '#005c99' }]}
  textSize={20}
  labelColor="#4d94ff"
  stackSeries={false}
  thickness={5}
  margin={5}
  width={100}
  height={100}>
  <foreignObject x="25" y="20" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <h3 class={dashClass}>DASH</h3>
  </foreignObject>
</ProgressBar>
