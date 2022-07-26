import { GameObjects, Physics, Scene, Tilemaps } from 'phaser';
import { Player } from '~/classes/player';
import { RedChompingMonster } from '~/classes/red-chomping-monster';
import { MountainTroll } from '~/classes/mountain-troll';
import { GreenGolem } from '~/classes/green-golem';
import { gameObjectsToObjectPoints } from '~/helpers/gameobject-to-object-point';
import { EVENTS_NAME } from '../../consts';
import { Enemy } from '~/classes/enemy';
import { EnemySimple } from '~/classes/enemy-simple';

export class Level01Scene extends Scene {
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private wallsLayer!: Tilemaps.TilemapLayer;
    private groundLayer!: Tilemaps.TilemapLayer;

    private chests!: Phaser.GameObjects.Sprite[];

    private king!: Physics.Arcade.Sprite;
    private monster!: Physics.Arcade.Sprite;
    private player!: Player;
    private redChompingMonster!: RedChompingMonster;
    private mountainTroll!: MountainTroll;
    private greenGolem!: GreenGolem;
    private enemies!: Enemy[];
    // private enemies!: EnemySimple[];

    constructor() {
        super('level-01-scene');
    }

    create(): void {
        console.log('Level 01 scene was created');

        this.initMap();
        this.initChests();

        // this.king = new Physics.Arcade.Sprite(this, 100, 115, 'king');
        // // this.king.setScale(3);
        // // "anchor": { "x": 34, "y": 29 }
        // this.king.setOrigin(0.435897435897436, 0.5);
        // this.add.existing(this.king);

        // this.monster = new Physics.Arcade.Sprite(this, this.game.canvas.width - 100, 100, 'red-chomping-monster');
        // // this.monster.setScale(3);
        // // this.monster.scaleX = -3;
        // this.monster.scaleX = -1;
        // this.add.existing(this.monster);

        this.player = new Player(this, 100, 200, 1);
        this.player.create();

        this.redChompingMonster = new RedChompingMonster(this, this.game.canvas.width - 100, 215, 1, this.player);
        // this.redChompingMonster.create();

        // this.mountainTroll = new MountainTroll(this, this.game.canvas.width - 100, 330, 1, this.player);
        // this.mountainTroll.create();

        // this.greenGolem = new GreenGolem(this, this.game.canvas.width - 100, 445, 1, this.player);
        // this.greenGolem.create();

        this.initAnimations();
        this.initCamera();
        this.initEnemies();
    }

    update(): void {
        this.physics.add.collider(this.player, this.wallsLayer);
        this.updateChests();
        this.updateEnemies();

        // if (this.king) this.king.play('king-run', true);
        // if (this.redChompingMonster) this.monster.play('red-chomping-monster-run', true);
        this.player.update();
        if (this.redChompingMonster) this.redChompingMonster.update();
        if (this.mountainTroll) this.mountainTroll.update();
        if (this.greenGolem) this.greenGolem.update();
    }

    private initAnimations(): void {
        this.player.initAnimations();
        if (this.redChompingMonster) this.redChompingMonster.initAnimations();
        if (this.mountainTroll) this.mountainTroll.initAnimations();
        if (this.greenGolem) this.greenGolem.initAnimations();
    }

    private initMap(): void {
        this.map = this.make.tilemap({ key: 'dungeon', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon', 'tiles');
        this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
        this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);

        this.wallsLayer.setCollisionByProperty({ collides: true });
        this.showDebugWalls();
    }

    private initChests(): void {
        const chestPoints = gameObjectsToObjectPoints(
            this.map.filterObjects('Chests', (obj) => obj.name === 'ChestPoint'),
        );
        this.chests = chestPoints.map((chestPoint) =>
            this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(1.5),
        );
    }

    private updateChests(): void {
        this.chests.forEach((chest) => {
            this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
                this.game.events.emit(EVENTS_NAME.chestLoot);
                obj2.destroy();
                this.cameras.main.flash();
            });
        });
    }

    private initCamera(): void {
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(2);
    }

    private initEnemies(): void {
        const enemiesPoints = gameObjectsToObjectPoints(
            this.map.filterObjects('Enemies', (obj) => obj.name === 'EnemyPoint'),
        );

        this.enemies = enemiesPoints.map((enemyPoint) => {
            this.redChompingMonster = new RedChompingMonster(this, enemyPoint.x, enemyPoint.y, 1.5, this.player);
            this.redChompingMonster.create();
            return this.redChompingMonster;
        });

        // this.enemies = enemiesPoints.map((enemyPoint) =>
        //     new EnemySimple(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 503)
        //         .setName(enemyPoint.id.toString())
        //         .setScale(1.5),
        // );

        this.physics.add.collider(this.enemies, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
            (obj1 as Player).getDamage(1);
        });
    }

    public updateEnemies(): void {
        this.enemies.filter((enemy) => enemy?.active).forEach((enemy) => enemy.update());
    }

    private showDebugWalls(): void {
        if (this.game.config.physics.arcade?.debug) {
            const debugGraphics = this.add.graphics().setAlpha(0.7);
            this.wallsLayer.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            });
        }
    }
}
