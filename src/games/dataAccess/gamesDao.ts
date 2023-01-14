import { DAO } from "../../backend/dao";
import { Game, GameWithArt } from "../game";

export type GameFilters = {
    system?: string[]
}

export type GetGameOptions<WithArt extends boolean = boolean> = {withArt?: WithArt}
export type GameArtwork = {
    gameId: Game["id"],
    type: keyof GameWithArt["art"],
    path: string,
    isVideo: boolean
}

export abstract class GamesDAO extends DAO {
    constructor(){
        super();
    }

    abstract list(filters?:GameFilters):Promise<Game[]>;
    abstract get(gameId:string, options: GetGameOptions<false>):Promise<Game|undefined>;
    abstract get(gameId:string, options: GetGameOptions<true>):Promise<GameWithArt|undefined>;
    abstract get(gameId:string, options?: GetGameOptions):Promise<Game|undefined>;
    abstract getArt(gameId: Game["id"], type: keyof GameWithArt["art"]): Promise<GameArtwork|undefined>;
    abstract setArt(details: GameArtwork):Promise<void>;
    abstract create(gameToCreate:Game):Promise<void>;
}