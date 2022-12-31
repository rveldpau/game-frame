import { DosboxLauncher } from "../games/launchers/dosbox";
import { Game } from "../games/game";
import { IPCAPI, BaseEvent, IPCAPIHelpers, LaunchGameEvent } from "./api";
import { ipcMain, IpcMain } from "electron";
import { Events } from "./events";
import { GamesDAO } from "../games/dataAccess/gamesDao";

export const createBackendAPI: (dependencies:{
    ipcMain: IpcMain,
    gamesDAO: GamesDAO
}) => void = ({ipcMain, gamesDAO}) => {
    ipcMain.handle(Events.games.launch, async (_, event:LaunchGameEvent) => {
        console.log("Launching " + event.game.path);
        await new DosboxLauncher().launch(event.game);
        console.log("Closed app!");
        return event;
      })

      ipcMain.handle(Events.games.list, (_) => {
        return gamesDAO.list();
      })
}

