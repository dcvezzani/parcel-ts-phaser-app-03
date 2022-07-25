import { Input, Math } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';

export class King extends Actor {
    protected boundingBoxDimensions: SizeDimensions;
    protected boundingBoxOffset: Math.Vector2;

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
        super(scene, x, y, scale, 'king');
        this.setScale(scale);
        this.setOrigin(0.435897435897436, 0.5);
        this.velocity = 200;

        // this.boundingBoxDimensions = { w: 20, h: 25 } as SizeDimensions;
        // this.boundingBoxOffset = new Math.Vector2(22, 20);
        this.boundingBoxDimensions = { w: 24, h: 29 } as SizeDimensions;
        this.boundingBoxOffset = new Math.Vector2(20, 17);
    }

    create(): void {
        super.create();
        this.getBody().setSize(this.boundingBoxDimensions.w, this.boundingBoxDimensions.h, true);
        this.getBody().offset.x = this.offsetRight;
        this.getBody().offset.y = this.boundingBoxOffset.y;
    }

    public initAnimations(): void {
        this.scene.anims.create({
            key: 'king-attack',
            frames: this.scene.anims.generateFrameNames('a-king', {
                prefix: 'attack-',
                end: 2,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'king-run',
            frames: this.scene.anims.generateFrameNames('a-king', {
                prefix: 'run-',
                end: 7,
            }),
            frameRate: 8,
        });
    }

    protected get offsetRight(): number {
        return this.boundingBoxOffset.x;
    }

    protected get offsetLeft(): number {
        return this.boundingBoxOffset.x + this.boundingBoxDimensions.w;
    }
}
