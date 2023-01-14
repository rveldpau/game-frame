import { Game } from "../games/game";
import {v4 as uuid} from "uuid";
import { System } from "../games/system";
import { DialogsAPI, GamesAPI, IPCAPI, LaunchGameEvent, SystemCreateEvent, SystemsAPI } from "./api";
import { BrowserWindow, IpcMain } from "electron";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { SupportedLaunchers } from "../games/launchers/launchers";
import { SupportedLauncher } from "../games/launchers/launchers";
import { BackendAPIGames } from "./backendAPI.games";
import { BackendAPISystems } from "./backendAPI.systems";
import { BackendAPIDialog } from "./backendAPI.dialogs";
import { GameDetailLookup } from "../games/detailsLookup/GameDetailLookup";

export class BackendAPI implements IPCAPI {
    public readonly games: GamesAPI;
    public readonly systems: SystemsAPI;
    public readonly dialogs: DialogsAPI;

    constructor(
        gamesDAO: GamesDAO,
        systemsDAO: SystemsDAO,
        detailLookups: GameDetailLookup[]
    ){
        this.games = new BackendAPIGames(gamesDAO, systemsDAO, detailLookups);
        this.systems = new BackendAPISystems(systemsDAO);
        this.dialogs = new BackendAPIDialog();
    }
    
}