<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text, Polygon } from 'svelte-phaser'
  let name = "";
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main">
    <Polygon
      x={200}
      y={200}
      points={[
        {
          x: 0,
          y: 20,
        },
        {
          x: 84,
          y: 20,
        },
        {
          x: 84,
          y: 0,
        },
        {
          x: 120,
          y: 50,
        },
        {
          x: 84,
          y: 100,
        },
        {
          x: 84,
          y: 80,
        },
        {
          x: 0,
          y: 80,
        },
      ]}
      strokeWidth={5}
      strokeColor={0xff0000} />
    <Text id="name" class="nameText" x={160} y={180} text="{name}" color="#1b90cf" />
    <Text x={130} y={150} text="svelte-phaser" color="white" />
  </Scene>
</Game>

<style>
  .nameInput {
    position: absolute;
    margin-left: 50%;
    margin-top: -5%;
    color: blue;
  }

  .nametext {
    color: blue;
  }
</style>

<html>
  <div>
    <p>Hello World</p>
    <input class="nameInput" type="text" name="testText" id="txtMe" placeholder="Write your name" bind:value={name}>
  </div>
</html>
