import { DAO } from "../../backend/dao";
import { Game, GameWithArt } from "../game";

export type GameGenre = {
    id: string,
    name: string,
    igdbId?: number
}
export abstract class GameGenreDAO extends DAO {
    constructor(){
        super();
    }

    abstract list():Promise<GameGenre[]>;
    abstract create(genre: GameGenre):Promise<void>;
}