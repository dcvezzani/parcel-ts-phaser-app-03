// import { Input, Physics } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';
import AnimationActions from '../helpers/animation-actions';
import { Player } from './player';

export class Enemy extends Actor {
    private target: Player;
    private started: boolean;
    private startedAnimation: boolean;
    private AGRESSOR_RADIUS = 200;
    private velocityOffset = 0.7;
    private animationActions: AnimationActions;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        scale: number,
        player: Player,
        enemySprite = 'enemy',
        animationActions = new AnimationActions({ run: EVENTS_NAME.enemyRun }),
    ) {
        super(scene, x, y, scale, enemySprite);
        this.setScale(scale);
        this.startedAnimation = false;
        this.started = false;
        this.target = player;
        this.animationActions = animationActions;
    }

    create(): void {
        super.create();

        this.setDirection(-1);
        this.getBody().setOffset(this.width, 0);
    }

    update(): void {
        super.update();

        if (
            Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y }) <
            this.AGRESSOR_RADIUS
        ) {
            this.getBody().setVelocityX((this.target.x - this.x) * this.velocityOffset);
            this.getBody().setVelocityY((this.target.y - this.y) * this.velocityOffset);
            this.checkFlip((direction: number) => {
                if (direction > 0) this.getBody().setOffset(0, 0);
                else this.getBody().setOffset(this.width, 0);
            });
            this.play(this.animationActions.run, true);
        } else {
            this.getBody().setVelocity(0);
        }
    }

    public initAnimations(): void {
        this.scene.anims.create({
            key: 'red-chomping-monster-run',
            frames: this.scene.anims.generateFrameNames('a-enemy', {
                prefix: 'walk-',
                end: 4,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'red-chomping-monster-jump',
            frames: this.scene.anims.generateFrameNames('a-enemy', {
                prefix: 'jump-',
                end: 2,
            }),
            frameRate: 8,
        });
    }
}
