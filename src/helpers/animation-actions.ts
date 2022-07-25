export default class AnimationActions {
    private _run!: string;

    constructor(actions: AnimationActionProperties) {
        this._run = actions.run;
    }

    get run() {
        return this._run;
    }
}
