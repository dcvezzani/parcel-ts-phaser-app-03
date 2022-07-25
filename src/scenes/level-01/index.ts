import { GameObjects, Physics, Scene } from 'phaser';
import { Player } from '~/classes/player';
export class Level01Scene extends Scene {
    private king!: Physics.Arcade.Sprite;
    private player!: Player;

    constructor() {
        super('level-01-scene');
    }

    create(): void {
        console.log('Level 01 scene was created');

        this.king = new Physics.Arcade.Sprite(this, 100, 115, 'king');
        this.king.setScale(3);
        // "anchor": { "x": 34, "y": 29 }
        this.king.setOrigin(0.435897435897436, 0.5);
        this.add.existing(this.king);

        this.player = new Player(this, 100, 215, 3);
        this.player.create();

        this.initAnimations();
    }

    update(): void {
        this.king.play('king-run', true);
        this.player.update();
    }

    private initAnimations(): void {
        this.player.initAnimations();
        // this.initKingAnimations();
        // this.initRedChompingMonsterAnimations();
        // this.mountainTroll.initAnimations();
    }
}
