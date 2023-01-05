import { DosboxLauncher } from "../games/launchers/dosbox";
import { Game } from "../games/game";
import { IPCAPI, BaseEvent, IPCAPIHelpers, LaunchGameEvent } from "./api";
import { ipcMain, IpcMain } from "electron";
import { Events } from "./events";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SupportedLaunchers } from "../games/launchers/launchers";
import { SystemsDAO } from "../games/dataAccess/systemsDao";

export const createBackendAPI: (dependencies:{
    ipcMain: IpcMain,
    gamesDAO: GamesDAO,
    systemsDAO: SystemsDAO,
}) => void = ({ipcMain, gamesDAO, systemsDAO}) => {
    ipcMain.handle(Events.games.launch, async (_, event:LaunchGameEvent) => {
        console.log("Launching " + event.game.path);
        const launcher = event.game.launcher ?? (await systemsDAO.get(event.game.systemId)).defaultLauncher;
        await SupportedLaunchers[launcher.id].launch(event.game, launcher.config);
        console.log("Closed app!");
        return event;
      })

      ipcMain.handle(Events.games.list, (_) => {
        return gamesDAO.list();
      })
}

