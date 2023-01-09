import { SupportedLaunchers, SupportedLauncher } from "../games/launchers/launchers";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { Game } from "../games/game";
import { GamesAPI, IPCAPI, LaunchGameEvent, SystemCreateEvent, SystemsAPI } from "./api";
import {v4 as uuid} from "uuid";

export class BackendAPISystems implements SystemsAPI{
    constructor(
        private systemsDAO: SystemsDAO,
    ){}
    async create({system}: SystemCreateEvent) {
        const id = uuid();
        await this.systemsDAO.create({ ...system, id });
        return id;
    }
    list() {
        return this.systemsDAO.list();
    }

}
