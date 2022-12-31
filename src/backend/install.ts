import Realm from "realm";
import { GamesDAO } from "../games/dataAccess/gamesDao";

export async function install({gamesDAO}:{gamesDAO:GamesDAO}):Promise<void>{
    // await gamesDAO.create({
    //     id: "test",
    //     name: "Textris",
    //     path: "/opt/games/dos/TEXTRIS/TEXTRIS.EXE"
    // })
}