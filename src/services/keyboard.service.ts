import { movementKeys } from '../enums/keyboard';

export class KeyboardService {
  keyboardInputs;
  input;

  constructor(input) {
    this.input = input;
  }

  IfAnyKeyIsDownValidation() {
    this.keyboardInputs = this.input.keyboard.addKeys(movementKeys);
    let checker = false;
    if (this.keyboardInputs.A.isDown) {
      checker = true;
    }
    if (this.keyboardInputs.W.isDown) {
      checker = true;
    }
    if (this.keyboardInputs.S.isDown) {
      checker = true;
    }
    if (this.keyboardInputs.D.isDown) {
      checker = true;
    }
    return checker;
  }
}
