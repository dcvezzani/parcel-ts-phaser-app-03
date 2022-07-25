import { GameObjects, Physics, Scene } from 'phaser';
import { Player } from '~/classes/player';
import { Enemy } from '~/classes/enemy';
export class Level01Scene extends Scene {
    private king!: Physics.Arcade.Sprite;
    private monster!: Physics.Arcade.Sprite;
    private player!: Player;
    private enemy!: Enemy;

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

        this.monster = new Physics.Arcade.Sprite(this, this.game.canvas.width - 100, 100, 'enemy');
        this.monster.setScale(3);
        this.monster.scaleX = -3;
        this.add.existing(this.monster);

        this.player = new Player(this, 100, 215, 3);
        this.player.create();

        this.enemy = new Enemy(this, this.game.canvas.width - 100, 215, 3, this.player);
        this.enemy.create();

        this.initAnimations();
    }

    update(): void {
        this.king.play('king-run', true);
        this.monster.play('red-chomping-monster-run', true);
        this.player.update();
        this.enemy.update();
    }

    private initAnimations(): void {
        this.player.initAnimations();
        this.enemy.initAnimations();
        // this.mountainTroll.initAnimations();
    }
}
