import { DAO } from "../../backend/dao";
import { Game } from "../game";

export abstract class GamesDAO extends DAO {
    constructor(){
        super();
    }

    abstract list():Promise<Game[]>;
    abstract create(gameToCreate:Game):Promise<void>;
}