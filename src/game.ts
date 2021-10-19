import { MIN_NB_PLAYER, MAX_NB_PLAYER } from "./constant";
import CardManager from "./card";
import PlayerManager, { Player } from "./player";

export interface IGame {
    readonly playerManager: PlayerManager;
    readonly cardManager: CardManager;
}

export default class Game implements IGame {
    public readonly playerManager: PlayerManager;
    public readonly cardManager: CardManager;

    constructor(nbPlayers: number) {
        this.playerManager = new PlayerManager(nbPlayers)
        this.cardManager = new CardManager()
        this.init();
    }

    private init() {
        this.cardManager.shuffleCards(this.playerManager.getPlayers());
    }

    public reset() {
        this.playerManager.reset();
        this.cardManager.reset();
        this.init();
    }
}

const game1 = new Game(3);
const game2 = new Game(6);
