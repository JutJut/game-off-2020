export interface CharacterConfig {
  key: string;
  body: {
    display: {
      frameWidth: number;
      frameHeight: number;
      scale: number;
    };
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
    };
  };
  audioAssets?;
}

export const availableCharacters: CharacterConfig[] = [
  {
    key: 'striker',
    body: {
      display: {
        frameWidth: 96,
        frameHeight: 96,
        scale: 1,
      },
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
    },
    spriteSheets: {
      IDLE: {
        key: 'striker_idle',
        path: './assets/Striker/strike_idle.png',
      },
      RUN: {
        key: 'striker_run',
        path: './assets/Striker/strike_run.png',
      },
      JUMP: {
        key: 'striker_jump',
        path: './assets/Striker/strike_jump.png',
      },
    },
    audioAssets: {},
  },
];
