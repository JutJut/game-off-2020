<script>
  import ProgressBar from '@okrad/svelte-progressbar';
  import { gameState } from '../store';


  let playerHealthValue;
  let playerDashCooldownValue;
  let dashClassValue;

  const unsubscribe = gameState.subscribe((value) => {
    const {playerHealth, dashOverlayClass, dashCooldownPercentage} = value;

    playerHealthValue = playerHealth
    playerDashCooldownValue = dashCooldownPercentage;
    dashClassValue = dashOverlayClass;
  });

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

  h3 {
    position: absolute;
    user-select: none;
    top:4%; left: 2%; 
  }

</style>

<h3 class={dashClassValue}>DASH</h3>
<ProgressBar
  style="linear"
  series={[{ perc: playerHealthValue, color: '#660000' }]}
  textSize={70}
  labelColor="#4d94ff"
  width="15%"
  height="15"  
  > 
</ProgressBar>