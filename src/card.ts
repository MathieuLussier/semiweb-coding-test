import { CARD_COLORS, NB_CARDS_PER_COLOR } from "./constant";
import PlayerManager, { Player } from "./player";

export interface ICard {
    readonly id: number;
    readonly label: number;
    readonly color: CARD_COLORS;
}

export class Card implements ICard {
    private readonly _id: number;
    private readonly _label: number;
    private readonly _color: CARD_COLORS;

    constructor(id: number, label: number, color: CARD_COLORS) {
        this._id = id;
        this._label = label;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get label() {
        return this._label;
    }

    get color() {
        return this._color;
    }
}

export interface ICardStorage {
    addCard(c: Card): void;
    getCards(): Card[];
    getCardById(id: number): Card | undefined;
    removeCard(n: Card | number): boolean;
    clearCards(): void;
}

export abstract class CardStorage implements ICardStorage {
    private _storageCards: Card[] = [];

    public addCard(c: Card) {
        this._storageCards.push(c);
    }

    public getCards(): Card[] {
        return this._storageCards;
    }

    public getCardById(id: number): Card | undefined {
        return this._storageCards.find((card: Card) => card.id === id);
    }

    public removeCard(id: number): boolean;
    public removeCard(c: Card): boolean;
    public removeCard(n: number | Card): boolean {
        const searchId = typeof n === 'object' ? n.id : n;
        const index = this._storageCards.findIndex((card: Card) => card.id === searchId);
        if (index > -1) {
            this._storageCards.splice(index, 1);
            return true;
        }
        return false;
    }

    public clearCards() {
        this._storageCards = [];
    }
}

export interface ICardManager {
    shuffleCards(players: Player[]): void;
    reset(): void;
}

export default class CardManager extends CardStorage implements ICardManager {
    constructor() {
        super();
        this.init();
    }

    /**
     * Init the card manager with x number of card per color and store them in the card storage.
     */
    private init() {
        this.prepareCards();
    }

    private prepareCards() {
        let colorIteration = 0;
        for (let CARD_COLOR in CARD_COLORS) {
            for (let i = 0; i < NB_CARDS_PER_COLOR; i++) {
                const newId = i + (colorIteration * NB_CARDS_PER_COLOR);
                const cardColor: CARD_COLORS = (<any>CARD_COLORS)[CARD_COLOR];
                this.addCard(new Card(newId, i + 1, cardColor));
            }
            colorIteration++;
        }
    }

    public shuffleCards(players: Player[]) {
        const nbCardsPerPerson = this.getCards().length / players.length;
        for (const player of players) {
            for (let i = 0; i < nbCardsPerPerson; i++) {
                const randomCard = this.getCards()[Math.floor(Math.random()*this.getCards().length)];
                player.addCard(randomCard);
                this.removeCard(randomCard);
            }
        }
    }

    public reset() {
        this.clearCards();
        this.prepareCards();
    }
}

export interface IPlayerCard {}

/**
 * This class might be empty but can be useful later.
 */
export abstract class PlayerCard extends CardStorage implements IPlayerCard {
    protected constructor() {
        super();
    }
}
