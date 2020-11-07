import { CharacterConfig } from '../config/characterConfig';

export class PlayerService {
  private static _instance: PlayerService;
  private _player: CharacterConfig = null;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get player() {
    return this._player;
  }

  public set player(value: CharacterConfig) {
    this._player = { ...this._player, ...value };
  }
}
