import { Input, Math } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';

export class King extends Actor {
    protected boundingBoxDimensions: Math.Vector2;
    protected boundingBoxOffset: Math.Vector2;

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
        super(scene, x, y, scale, 'king');
        this.setScale(scale);
        this.setOrigin(0.435897435897436, 0.5);
        this.velocity = 150;
        this.boundingBoxDimensions = new Math.Vector2(20, 25);
        this.boundingBoxOffset = new Math.Vector2(22, 20);
    }

    create(): void {
        super.create();
        this.getBody().setSize(this.boundingBoxDimensions.x, this.boundingBoxDimensions.y, true);
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
        return this.boundingBoxOffset.x + this.boundingBoxDimensions.x;
    }
}
