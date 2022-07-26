// import { Input, Physics } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';
import AnimationActions from '../helpers/animation-actions';
import { Player } from './player';

export class Enemy extends Actor {
    private target: Player;
    private AGRESSOR_RADIUS = 150;
    private velocityOffset = 1.5;
    private animationActions: AnimationActions;
    private attackHandler: () => void;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        scale: number,
        player: Player,
        enemySprite = 'red-chomping-monster',
        animationActions = new AnimationActions({ run: EVENTS_NAME.redChompingMonsterRun }),
    ) {
        super(scene, x, y, scale, enemySprite);
        this.setScale(scale);
        this.target = player;
        this.animationActions = animationActions;

        this.attackHandler = () => {
            if (
                Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y }) <
                this.target.width
            ) {
                this.getDamage();
                this._destroy();
                this.disableBody(true, false);
                this.scene.time.delayedCall(300, () => {
                    this.destroy();
                });
            }
        };

        // EVENTS
        this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
        this.on('destroy', () => {
            this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
        });
    }

    create(): void {
        super.create();

        this.setDirection(-1);
        this.getBody().setOffset(this.width, 0);
    }

    update(): void {
        if (!this.active) return;

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

    public setTarget(target: Player): void {
        this.target = target;
    }
}
