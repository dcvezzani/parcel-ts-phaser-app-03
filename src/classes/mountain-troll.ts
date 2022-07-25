// import { Input, Physics } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';
import AnimationActions from '../helpers/animation-actions';
import { Player } from './player';
import { Enemy } from './enemy';

export class MountainTroll extends Enemy {
    constructor(scene: Phaser.Scene, x: number, y: number, scale: number, player: Player) {
        super(
            scene,
            x,
            y,
            scale,
            player,
            'mountain-troll',
            new AnimationActions({ run: EVENTS_NAME.mountainTrollRun }),
        );
    }

    public initAnimations(): void {
        this.scene.anims.create({
            key: 'mountain-troll-run',
            frames: this.scene.anims.generateFrameNames('a-mountain-troll', {
                prefix: 'walk-',
                end: 4,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'mountain-troll-jump',
            frames: this.scene.anims.generateFrameNames('a-mountain-troll', {
                prefix: 'jump-',
                end: 2,
            }),
            frameRate: 8,
        });
    }
}
