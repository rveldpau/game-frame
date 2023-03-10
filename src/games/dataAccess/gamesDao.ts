import { DAO } from "../../backend/dao";
import { Game, GameWithArt } from "../game";

export type GameFilters = {
    systemId?: string[],
    path?: string,
    query?: string
}

export type GetGameOptions<WithArt extends boolean = boolean> = {withArt?: WithArt}
export type GameArtwork = {
    gameId: Game["id"],
    type: keyof GameWithArt["art"],
    path: string
}

export abstract class GamesDAO extends DAO {
    constructor(){
        super();
    }

    abstract list(filters?:GameFilters):Promise<Game[]>;
    abstract get(gameId:string, options: GetGameOptions<false>):Promise<Game|undefined>;
    abstract get(gameId:string, options: GetGameOptions<true>):Promise<GameWithArt|undefined>;
    abstract get(gameId:string, options?: GetGameOptions):Promise<Game|undefined>;
    abstract delete(gameId:string):Promise<void>;
    abstract getArt(gameId: Game["id"], type: keyof GameWithArt["art"]): Promise<GameArtwork|undefined>;
    abstract setArt(details: GameArtwork):Promise<void>;
    abstract create(gameToCreate:Game):Promise<void>;
    abstract update(gameToUpdate:Game):Promise<void>;
}