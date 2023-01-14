import { SupportedLaunchers, SupportedLauncher } from "../games/launchers/launchers";
import { GameFilters, GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { Game } from "../games/game";
import { DialogsAPI, GamesAPI, IPCAPI, LaunchGameEvent } from "./api";
import {v4 as uuid} from "uuid";
import { BrowserWindow, dialog } from "electron";

export class BackendAPIDialog implements DialogsAPI{
    constructor(
    ){}
    async selectFileForOpen(props:Electron.OpenDialogOptions):Promise<string[]> {
        const window = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
        const result = await dialog.showOpenDialog(window, props)
        return result.filePaths;
    }
}