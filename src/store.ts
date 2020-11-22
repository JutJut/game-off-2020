import { writable } from 'svelte/store';

export const gameState = writable({
  scene: '',
  playerHealth: 150,
  dashCooldownPercentage: 0,
  dashOverlayClass: '',
  canDash: true
});
