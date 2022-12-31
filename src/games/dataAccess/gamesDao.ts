import Realm from "realm";
import { Game } from "../game";

export class GamesDAO {
    public static readonly GameRealmName = "games";
    public static GameSchemaProperties: Record<keyof Game, Realm.PropertyType> = {
        id: "string",
        name: "string",
        path: "string"
    }

    constructor(private readonly realm: Realm){
    }

    async list():Promise<Game[]> {
        return await this.realm.objects<Game>(GamesDAO.GameRealmName).map(a => a);
    }

    async create(gameToCreate:Game):Promise<void> {
        if((await this.list()).some(game => game.id === gameToCreate.id)){
            console.log("Game with this ID already exists", gameToCreate);
            return;
        }
        return await this.realm.write(async () => {
            await this.realm.create(GamesDAO.GameRealmName, gameToCreate)
        }) 
    }
}