import { Scene, Tilemaps } from 'phaser';

export class LoadingScene extends Scene {
    constructor() {
        super('loading-scene');
    }

    preload(): void {
        this.load.baseURL = 'assets/';

        this.loadDungeonTilemap();

        this.loadDungeonSpriteSheet();

        this.loadKingSprites();
        this.loadRedChompingMonsterSprites();
        this.loadMountainTrollSprites();
        this.loadGreenGolemSprites();
    }

    create(): void {
        console.log('Loading scene was created');
        this.scene.start('level-01-scene');
        this.scene.start('ui-scene');
    }

    private loadDungeonTilemap(): void {
        this.load.image({
            key: 'tiles',
            url: 'tilemaps/tiles/dungeon-16-16.png',
        });
        this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json');
    }

    private loadDungeonSpriteSheet(): void {
        this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    private loadKingSprites(): void {
        this.load.image('king', 'sprites/king.png');
        this.load.atlas('a-king', 'spritesheets/piskel/a-king/a-king.png', 'spritesheets/piskel/a-king/a-king.json');
    }

    private loadRedChompingMonsterSprites(): void {
        this.load.image('red-chomping-monster', 'sprites/red-chomping-monster.png');
        this.load.atlas(
            'a-red-chomping-monster',
            'spritesheets/red-chomping-monster.png',
            'spritesheets/red-chomping-monster_atlas.json',
        );
    }

    private loadMountainTrollSprites(): void {
        this.load.image('mountain-troll', 'sprites/mountain-troll.png');
        this.load.atlas(
            'a-mountain-troll',
            'spritesheets/mountain-troll.png',
            'spritesheets/mountain-troll_atlas.json',
        );
    }

    private loadGreenGolemSprites(): void {
        this.load.image('green-golem', 'sprites/green-golem.png');
        this.load.atlas('a-green-golem', 'spritesheets/green-golem.png', 'spritesheets/green-golem_atlas.json');
    }
}
