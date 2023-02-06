import { Game } from "../games/game";
import {v4 as uuid} from "uuid";
import { System } from "../games/system";
import { DialogsAPI, GamesAPI, ImportAPI, IPCAPI, LaunchGameEvent, SystemCreateEvent, SystemsAPI } from "./api";
import { BrowserWindow, IpcMain } from "electron";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { SupportedLaunchers } from "../games/launchers/launchers";
import { SupportedLauncher } from "../games/launchers/launchers";
import { BackendAPIGames } from "./backendAPI.games";
import { BackendAPISystems } from "./backendAPI.systems";
import { BackendAPIDialog } from "./backendAPI.dialogs";
import { GameDetailLookup } from "../games/detailsLookup/GameDetailLookup";
import { BackendAPIImport } from "./backendAPI.import";
import { ImporterImpl } from "../games/importers/importerImpl";
import { AnyImporter } from "../games/importers/importer";
import { ImportManager } from "../games/importers/importManager";
import { GameGenreDAO } from "../games/dataAccess/genresDao";

export class BackendAPI implements IPCAPI {
    public readonly games: GamesAPI;
    public readonly systems: SystemsAPI;
    public readonly dialogs: DialogsAPI;
    public readonly import: ImportAPI;

    constructor(
        gamesDAO: GamesDAO,
        genreDAO: GameGenreDAO,
        systemsDAO: SystemsDAO,
        detailLookups: GameDetailLookup[],
        importers: ImporterImpl<AnyImporter>[]
    ){
        this.games = new BackendAPIGames(gamesDAO, genreDAO, systemsDAO, detailLookups);
        this.systems = new BackendAPISystems(systemsDAO);
        this.dialogs = new BackendAPIDialog();
        this.import = new BackendAPIImport(new ImportManager(gamesDAO, systemsDAO, detailLookups, importers));
    }
    
}