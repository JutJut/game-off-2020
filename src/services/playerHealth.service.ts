import { writable } from 'svelte/store';

export const playerHealth = writable(0);
export const dashCooldownPercentage = writable(0);
export const dashOverlayClass = writable('');
export const canDash = writable(true);
