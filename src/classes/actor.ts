import { GameObjects, Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {
    protected velocity: number;
    protected _scale: number;
    private debugOrigin!: GameObjects.Arc;
    private debugBoundingBoxOrigin!: GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.velocity = 0;
        this._scale = scale;
    }

    create(): void {
        if (this.scene.game.config.physics.arcade?.debug) {
            this.debugOrigin = this.scene.add.circle(this.x + this.originX, this.y + this.originY, 10, 0x6666ff);

            this.debugBoundingBoxOrigin = this.scene.add.circle(
                this.getBody().x + this.getBody().halfWidth,
                this.getBody().y + this.getBody().halfHeight,
                10,
                0xff0000,
            );
        }
    }

    update(): void {
        this.debugShowOriginPoints();
    }

    protected debugShowOriginPoints(): void {
        if (this.scene.game.config.physics.arcade?.debug) {
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
}
