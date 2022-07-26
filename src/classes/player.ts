import { Input } from 'phaser';
import { Actor } from './actor';
import { EVENTS_NAME, GameStatus } from '../consts';
import { King } from './king';
import { Text } from './text';

export class Player extends King {
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private keySpace: Input.Keyboard.Key;

    private hpValue: Text;

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
        super(scene, x, y, scale);

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.keySpace = this.scene.input.keyboard.addKey(32);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.keySpace.on('down', (event: KeyboardEvent) => {
            this.anims.play(EVENTS_NAME.attack, true);
            this.scene.game.events.emit(EVENTS_NAME.attack);
        });

        this.on('destroy', () => {
            this.keySpace.removeAllListeners();
        });

        this.hpValue = new Text(this.scene, this.x, this.y - this.height, this.hp.toString())
            .setFontSize(12)
            .setOrigin(0.8, 0.5);
    }

    create(): void {
        super.create();
    }

    update(): void {
        super.update();
        this.getBody().setVelocity(0);

        if (this.keyW?.isDown) {
            this.getBody().setVelocityY(-this.velocity);
            !this.anims.isPlaying && this.play(EVENTS_NAME.run, true);
        }
        if (this.keyA?.isDown) {
            this.getBody().setVelocityX(-this.velocity);
            this.getBody().offset.x = this.offsetLeft;
            this.checkFlip();
            !this.anims.isPlaying && this.play(EVENTS_NAME.run, true);
        }
        if (this.keyS?.isDown) {
            this.getBody().setVelocityY(this.velocity);
            !this.anims.isPlaying && this.play(EVENTS_NAME.run, true);
        }
        if (this.keyD?.isDown) {
            this.getBody().setVelocityX(this.velocity);
            this.getBody().offset.x = this.offsetRight;
            this.checkFlip();
            !this.anims.isPlaying && this.play(EVENTS_NAME.run, true);
        }

        this.updateHP();
    }

    private updateHP(): void {
        this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
        this.hpValue.setOrigin(0.8, 0.5);
    }

    getDamage(value: number) {
        super.getDamage(value);
        this.hpValue.setText(this.hp.toString());

        if (this.hp <= 0) {
            this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
        }
    }
}
