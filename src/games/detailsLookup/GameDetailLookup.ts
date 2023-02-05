import { Game, GameWithArt } from "../game";

export type GameDetailLookupResult = Partial<GameWithArt> & { lookupSource: string };
export abstract class GameDetailLookup {
    abstract execute(game:Partial<Game>): Promise<GameDetailLookupResult[]>;
} 
