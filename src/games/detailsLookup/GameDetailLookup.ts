import { Game, GameWithArt } from "../game";

export type GameDetailLookupResult = Pick<GameWithArt, "details"|"art"> & { lookupSource: string };
export abstract class GameDetailLookup {
    abstract execute(game:Partial<Game>): Promise<GameDetailLookupResult>;
} 
