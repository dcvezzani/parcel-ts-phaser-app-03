import { Game, Types } from 'phaser';
import { Level01Scene, LoadingScene, UIScene } from './scenes';

type GameConfigExtended = Types.Core.GameConfig & {
    winScore: number;
};

declare global {
    interface Window {
        sizeChanged: () => void;
        game: Phaser.Game;
    }
}

let sizeChangedTimeout = 0;
window.sizeChanged = () => {
    if (!!sizeChangedTimeout) clearTimeout(sizeChangedTimeout);

    sizeChangedTimeout = setTimeout(() => {
        if (window.game.isBooted) {
            setTimeout(() => {
                window.game.scale.resize(window.innerWidth, window.innerHeight);
                window.game.canvas.setAttribute(
                    'style',
                    `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
                );
            }, 100);
        }
    }, 250);
};

export const gameConfig: GameConfigExtended = {
    title: 'Phaser game tutorial',
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#351f1b',
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    callbacks: {
        postBoot: () => {
            window.sizeChanged();
        },
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: [LoadingScene, Level01Scene, UIScene],
    winScore: 40,
};

window.game = new Game(gameConfig);

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    window.addEventListener('resize', () => {
        window.sizeChanged();
    });
});
