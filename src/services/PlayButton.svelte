<script>
    import Phaser from 'phaser';
    import { OurScenes } from '../enums/scenes';

    let scene = new Phaser.Scene();

	function handleClick() {
        // scene.start(OurScenes.GAME);
        console.log('Clicked');
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>