import { GameObjects, Physics, Scene } from 'phaser';
import { Player } from '~/classes/player';
import { RedChompingMonster } from '~/classes/red-chomping-monster';
import { MountainTroll } from '~/classes/mountain-troll';
import { GreenGolem } from '~/classes/green-golem';

export class Level01Scene extends Scene {
    private king!: Physics.Arcade.Sprite;
    private monster!: Physics.Arcade.Sprite;
    private player!: Player;
    private redChompingMonster!: RedChompingMonster;
    private mountainTroll!: MountainTroll;
    private greenGolem!: GreenGolem;

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

        this.monster = new Physics.Arcade.Sprite(this, this.game.canvas.width - 100, 100, 'red-chomping-monster');
        this.monster.setScale(3);
        this.monster.scaleX = -3;
        this.add.existing(this.monster);

        this.player = new Player(this, 100, 215, 3);
        this.player.create();

        this.redChompingMonster = new RedChompingMonster(this, this.game.canvas.width - 100, 215, 3, this.player);
        this.redChompingMonster.create();

        this.mountainTroll = new MountainTroll(this, this.game.canvas.width - 100, 330, 3, this.player);
        this.mountainTroll.create();

        this.greenGolem = new GreenGolem(this, this.game.canvas.width - 100, 445, 3, this.player);
        this.greenGolem.create();

        this.initAnimations();
    }

    update(): void {
        this.king.play('king-run', true);
        this.monster.play('red-chomping-monster-run', true);
        this.player.update();
        this.redChompingMonster.update();
        this.mountainTroll.update();
        this.greenGolem.update();
    }

    private initAnimations(): void {
        this.player.initAnimations();
        this.redChompingMonster.initAnimations();
        this.mountainTroll.initAnimations();
        this.greenGolem.initAnimations();
    }
}
