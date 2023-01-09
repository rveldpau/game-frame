import { Game } from "../games/game";
import {v4 as uuid} from "uuid";
import { System } from "../games/system";
import { GamesAPI, IPCAPI, LaunchGameEvent, SystemCreateEvent, SystemsAPI } from "./api";
import { IpcMain } from "electron";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { SupportedLaunchers } from "../games/launchers/launchers";
import { SupportedLauncher } from "../games/launchers/launchers";
import { BackendAPIGames } from "./backendAPI.games";
import { BackendAPISystems } from "./backendAPI.systems";

export class BackendAPI implements IPCAPI {
    public readonly games: GamesAPI;
    public readonly systems: SystemsAPI;

    constructor(
        gamesDAO: GamesDAO,
        systemsDAO: SystemsDAO,
    ){
        this.games = new BackendAPIGames(gamesDAO, systemsDAO);
        this.systems = new BackendAPISystems(systemsDAO);
    }
    
}