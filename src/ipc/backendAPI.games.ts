import { SupportedLaunchers, SupportedLauncher } from "../games/launchers/launchers";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { Game } from "../games/game";
import { GamesAPI, IPCAPI, LaunchGameEvent } from "./api";

export class BackendAPIGames implements GamesAPI{
    constructor(
        private gamesDAO: GamesDAO,
        private systemsDAO: SystemsDAO,
    ){}
    async launch({game}: LaunchGameEvent){
        console.log("Launching " + game.path);
        const launcher = game.launcher ?? (await this.systemsDAO.get(game.systemId)).defaultLauncher;
        await SupportedLaunchers[launcher.id as SupportedLauncher["id"]].launch(game, launcher.config);
        console.log("Closed app!");
    }
    list() {
        return this.gamesDAO.list();
    }
}