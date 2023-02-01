import { SupportedLaunchers, SupportedLauncher } from "../games/launchers/launchers";
import { GameFilters, GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { GamesAPI, IPCAPI, LaunchGameEvent } from "./api";
import {v4 as uuid} from "uuid";
import { GameDetailLookup } from "../games/detailsLookup/GameDetailLookup";

export class BackendAPIGames implements GamesAPI{
    constructor(
        private gamesDAO: GamesDAO,
        private systemsDAO: SystemsDAO,
        private detailLookups: GameDetailLookup[],
    ){
        console.log("Detail Lookups", detailLookups)
    }
    async launch({game}: Parameters<GamesAPI["launch"]>[0]){
        console.log("Launching " + game.path);
        const launcher = game.launcher ?? (await this.systemsDAO.get(game.systemId)).defaultLauncher;
        await SupportedLaunchers[launcher.id as SupportedLauncher["id"]].launch(game, launcher.config);
        console.log("Closed app!");
    }
    list(filters?:GameFilters) {
        return this.gamesDAO.list(filters);
    }
    async get(gameId:Parameters<GamesAPI["get"]>[0]) {
        console.log("Getting", gameId);
        const result = await this.gamesDAO.get(gameId, { withArt: true});
        console.log("API Result", result);
        return result;
    }

    async delete(gameId:Parameters<GamesAPI["delete"]>[0]){
        await this.gamesDAO.delete(gameId);
    }

    async create({game}:Parameters<GamesAPI["create"]>[0]){
        const id = uuid();
        await this.gamesDAO.create({ ...game, id });
        return id;
    }

    async update({game}:Parameters<GamesAPI["update"]>[0]){
        await this.gamesDAO.update(game);
    }
    async lookupDetails(game:Parameters<GamesAPI["lookupDetails"]>[0]){
        const lookupResults = await Promise.all(this.detailLookups.map(lookup => lookup.execute(game)));
        return lookupResults;
    }
}