import { PlayerCard } from "./card";
import {MAX_NB_PLAYER, MIN_NB_PLAYER} from "./constant";
import Game from "./game";

export interface IPlayerManager {
    players: Player[];
    getPlayers(): Player[];
    nbPlayers: number;
}

export default class PlayerManager implements IPlayerManager {
    private readonly _game: Game;
    private readonly _players: Player[] = [];

    constructor(game: Game, nbPlayers: number) {
        if (nbPlayers < MIN_NB_PLAYER || nbPlayers > MAX_NB_PLAYER)
            throw new Error(`Number of players can only be between ${MIN_NB_PLAYER} and ${MAX_NB_PLAYER}`);

        this._game = game;

        for (let i = 0; i < nbPlayers; i++) {
            this._players.push(new Player(i));
        }
    }

    public reset() {
        for (const player of this.getPlayers()) {
            player.clearCards();
        }
    }

    public get players(): Player[] {
        return this._players;
    }

    public getPlayers(): Player[] {
        return this._players;
    }

    public get nbPlayers(): number {
        return this._players.length;
    }
}

export interface IPlayer {
    id: number;
}

export class Player extends PlayerCard implements IPlayer {
     private readonly _id: number;

     constructor(id: number) {
         super();
         this._id = id;
     }

     public get id() {
         return this._id;
     }
}
