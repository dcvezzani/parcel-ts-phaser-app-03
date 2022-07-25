// import { Input, Physics } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';
import AnimationActions from '../helpers/animation-actions';
import { Player } from './player';
import { Enemy } from './enemy';

export class RedChompingMonster extends Enemy {
    constructor(scene: Phaser.Scene, x: number, y: number, scale: number, player: Player) {
        super(
            scene,
            x,
            y,
            scale,
            player,
            'red-chomping-monster',
            new AnimationActions({ run: EVENTS_NAME.redChompingMonsterRun }),
        );
    }

    public initAnimations(): void {
        this.scene.anims.create({
            key: 'red-chomping-monster-run',
            frames: this.scene.anims.generateFrameNames('a-red-chomping-monster', {
                prefix: 'walk-',
                end: 4,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'red-chomping-monster-jump',
            frames: this.scene.anims.generateFrameNames('a-red-chomping-monster', {
                prefix: 'jump-',
                end: 2,
            }),
            frameRate: 8,
        });
    }
}
