import { Scene } from 'phaser';

export class LoadingScene extends Scene {
    constructor() {
        super('loading-scene');
    }

    preload(): void {
        this.load.baseURL = 'assets/';

        this.loadKingSprites();
    }

    create(): void {
        console.log('Loading scene was created');
        this.scene.start('level-01-scene');
        this.scene.start('ui-scene');
    }

    private loadKingSprites(): void {
        this.load.image('king', 'sprites/king.png');
        this.load.atlas('a-king', 'spritesheets/piskel/a-king/a-king.png', 'spritesheets/piskel/a-king/a-king.json');
    }
}
