export interface CharacterConfig {
  key: string;
  body: {
    health: number;
  };
  animations: {
    [key: string]: {
      key: string;
      frames: {
        key: string;
        startFrame: number;
        endFrame: number;
      };
      frameRate: number;
      repeat: number;
    };
  };
  spriteSheets: {
    [key: string]: {
      key: string;
      path: string;
      frameWidth: number;
      frameHeight: number;
    };
  };
  audioAssets?;
}

export const mainCharacter: CharacterConfig =
  {
    key: 'striker',
    body: {
      health: 1000,
    },
    animations: {
      IDLE: {
        key: 'IDLE',
        frames: {
          key: 'striker_idle',
          startFrame: 0,
          endFrame: 7,
        },
        frameRate: 10,
        repeat: -1,
      },
      RUN: {
        key: 'RUN',
        frames: {
          key: 'striker_run',
          startFrame: 0,
          endFrame: 7,
        },
        frameRate: 10,
        repeat: -1,
      },
      JUMP: {
        key: 'JUMP',
        frames: {
          key: 'striker_jump',
          startFrame: 0,
          endFrame: 11,
        },
        frameRate: 10,
        repeat: -1,
      },
      DEATH: {
        key: 'DEATH',
        frames: {
          key: 'striker_death',
          startFrame: 0,
          endFrame: 15,
        },
        frameRate: 10,
        repeat: 0,
      },
      DASH: {
        key: 'DASH',
        frames: {
          key: 'striker_dash',
          startFrame: 0,
          endFrame: 15,
        },
        frameRate: 10,
        repeat: -1,
      },
      ATTACK: {
        key: 'ATTACK',
        frames: {
          key: 'striker_slash',
          startFrame: 0,
          endFrame: 15,
        },
        frameRate: 10,
        repeat: -1,
      },
    },
    spriteSheets: {
      IDLE: {
        key: 'striker_idle',
        path: './assets/Striker/striker_idle.png',
        frameWidth: 96,
        frameHeight: 96,
      },
      RUN: {
        key: 'striker_run',
        path: './assets/Striker/striker_run.png',
        frameWidth: 96,
        frameHeight: 96,
      },
      JUMP: {
        key: 'striker_jump',
        path: './assets/Striker/striker_jump.png',
        frameWidth: 96,
        frameHeight: 96,
      },
      DEATH: {
        key: 'striker_death',
        path: './assets/Striker/striker_death.png',
        frameWidth: 96,
        frameHeight: 96,
      },
      DASH: {
        key: 'striker_dash',
        path: './assets/Striker/strikerDash.png',
        frameWidth: 96,
        frameHeight: 96,
      },
      ATTACK: {
        key: 'striker_slash',
        path: './assets/Striker/strikerSlashWithEffect.png',
        frameWidth: 128,
        frameHeight: 96,
      },
    },
    audioAssets: {},
  };
