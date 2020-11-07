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
    key: 'steam_man',
    body: {
      display: {
        frameWidth: 48,
        frameHeight: 48,
        scale: 1,
      },
      health: 100,
    },
    animations: {
      SPAWN: {
        key: 'SPAWN',
        frames: {
          key: 'steamman_idle',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 10,
        repeat: -1,
      },
      IDLE: {
        key: 'IDLE',
        frames: {
          key: 'steamman_idle',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 10,
        repeat: -1,
      },
      WALK: {
        key: 'WALK',
        frames: {
          key: 'steamman_walk',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 10,
        repeat: -1,
      },
      RUN: {
        key: 'RUN',
        frames: {
          key: 'steamman_run',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 10,
        repeat: -1,
      },
      JUMP: {
        key: 'JUMP',
        frames: {
          key: 'steamman_jump',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 7,
        repeat: -1,
      },
    },
    spriteSheets: {
      SPAWN: {
        key: 'steam_man',
        path: './assets/SteamMan/SteamMan.png',
      },
      IDLE: {
        key: 'steamman_idle',
        path: './assets/SteamMan/SteamMan_idle.png',
      },
      WALK: {
        key: 'steamman_walk',
        path: './assets/SteamMan/SteamMan_walk.png',
      },
      RUN: {
        key: 'steamman_run',
        path: './assets/SteamMan/SteamMan_run.png',
      },
      JUMP: {
        key: 'steamman_jump',
        path: './assets/SteamMan/SteamMan_jump.png',
      },
    },
    audioAssets: {},
  },
  {
    key: 'archer',
    body: {
      display: {
        frameWidth: 128,
        frameHeight: 75,
        scale: 1,
      },
      health: 100,
    },
    animations: {
      SPAWN: {
        key: 'SPAWN',
        frames: {
          key: 'archer',
          startFrame: 0,
          endFrame: 1,
        },
        frameRate: 10,
        repeat: -1,
      },
      IDLE: {
        key: 'IDLE',
        frames: {
          key: 'archer_idle',
          startFrame: 0,
          endFrame: 3,
        },
        frameRate: 10,
        repeat: -1,
      },
      WALK: {
        key: 'WALK',
        frames: {
          key: 'archer_run',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 10,
        repeat: -1,
      },
      RUN: {
        key: 'RUN',
        frames: {
          key: 'archer_run',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 20,
        repeat: -1,
      },
      JUMP: {
        key: 'JUMP',
        frames: {
          key: 'archer_jump',
          startFrame: 0,
          endFrame: 5,
        },
        frameRate: 10,
        repeat: -1,
      },
    },
    spriteSheets: {
      SPAWN: {
        key: 'archer',
        path: './assets/Archer/archer_idle.png',
      },
      IDLE: {
        key: 'archer_idle',
        path: './assets/Archer/archer_idle.png',
      },
      WALK: {
        key: 'archer_run',
        path: './assets/Archer/archer_run.png',
      },
      RUN: {
        key: 'archer_run',
        path: './assets/Archer/archer_run.png',
      },
      JUMP: {
        key: 'archer_jump',
        path: './assets/Archer/archer_jump.png',
      },
    },
    audioAssets: {},
  },
];
