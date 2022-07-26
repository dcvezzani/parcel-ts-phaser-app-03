import { GameObjects, Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {
    protected velocity: number;
    protected _scale: number;
    private debugOrigin!: GameObjects.Arc;
    private debugBoundingBoxOrigin!: GameObjects.Arc;
    protected hp = 100;

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);

        this.velocity = 0;
        this._scale = scale;
    }

    create(): void {
        this.debugCreateOriginPoints();
    }

    update(): void {
        if (!this.active) return;

        this.debugShowOriginPoints();
    }

    protected debugCreateOriginPoints(): void {
        if (this.scene && this.scene.game.config.physics.arcade?.debug) {
            this.debugOrigin = this.scene.add.circle(
                this.x + this.originX,
                this.y + this.originY,
                Math.abs(2 * this._scale),
                0x6666ff,
            );
            this.debugBoundingBoxOrigin = this.scene.add.circle(
                this.getBody().x + this.getBody().halfWidth,
                this.getBody().y + this.getBody().halfHeight,
                Math.abs(2 * this._scale),
                0xff0000,
            );
        }
    }

    protected debugShowOriginPoints(): void {
        if (this.scene && this.scene.game.config.physics.arcade?.debug) {
            const debugOriginPosition = { x: this.x + this.originX, y: this.y + this.originY };
            const debugBoundingBoxOrigin = {
                x: this.getBody().x + this.getBody().halfWidth,
                y: this.getBody().y + this.getBody().halfHeight,
            };

            this.debugOrigin.setPosition(debugOriginPosition.x, debugOriginPosition.y);
            this.debugBoundingBoxOrigin.setPosition(debugBoundingBoxOrigin.x, debugBoundingBoxOrigin.y);
        }
    }

    protected checkFlip(callback?: Callback): void {
        this.setDirection(this.body.velocity.x);
        if (callback) callback(this.scaleX);
    }

    public setDirection(velocity: number): void {
        if (velocity < 0) {
            this.scaleX = -this._scale;
        } else {
            this.scaleX = this._scale;
        }
    }

    public getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }

    public getDamage(value?: number): void {
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onStart: () => {
                if (value) {
                    this.hp = this.hp - value;
                }
            },
            onComplete: () => {
                this.setAlpha(1);
            },
        });
    }

    public getHPValue(): number {
        return this.hp;
    }

    protected _destroy(): void {
        if (this.debugOrigin) this.debugOrigin.destroy();
        if (this.debugBoundingBoxOrigin) this.debugBoundingBoxOrigin.destroy();
    }
}
