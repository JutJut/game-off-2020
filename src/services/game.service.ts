import { OurScenes } from '../enums/scenes';

export const restartGame = function (input, scene) {
    input.keyboard.removeAllKeys();
    setTimeout(() => {
         scene.start(OurScenes.GAME);
    }, 3000);
}