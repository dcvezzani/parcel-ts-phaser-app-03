// import { Input, Physics } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';
import AnimationActions from '../helpers/animation-actions';
import { Player } from './player';
import { Enemy } from './enemy';

export class GreenGolem extends Enemy {
    constructor(scene: Phaser.Scene, x: number, y: number, scale: number, player: Player) {
        super(scene, x, y, scale, player, 'green-golem', new AnimationActions({ run: EVENTS_NAME.greenGolemRun }));
    }

    public initAnimations(): void {
        this.scene.anims.create({
            key: EVENTS_NAME.greenGolemRun,
            frames: this.scene.anims.generateFrameNames('a-green-golem', {
                prefix: 'walk-',
                end: 4,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'green-golem-jump',
            frames: this.scene.anims.generateFrameNames('a-green-golem', {
                prefix: 'jump-',
                end: 2,
            }),
            frameRate: 8,
        });
    }
}
