import { DosboxLauncher } from "../games/launchers/dosbox";
import { Game } from "../games/game";
import { IPCAPI, BaseEvent, IPCAPIHelpers, LaunchGameEvent, SystemCreateEvent } from "./api";
import { ipcMain, IpcMain } from "electron";
import { Events } from "./events";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SupportedLauncher, SupportedLaunchers } from "../games/launchers/launchers";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { v4 as uuid} from "uuid";

export const createBackendAPI: (dependencies:{
    ipcMain: IpcMain,
    gamesDAO: GamesDAO,
    systemsDAO: SystemsDAO,
}) => void = ({ipcMain, gamesDAO, systemsDAO}) => {
    ipcMain.handle(Events.games.launch, async (_, event:LaunchGameEvent) => {
        console.log("Launching " + event.game.path);
        const launcher = event.game.launcher ?? (await systemsDAO.get(event.game.systemId)).defaultLauncher;
        await SupportedLaunchers[launcher.id as SupportedLauncher["id"]].launch(event.game, launcher.config);
        console.log("Closed app!");
        return event;
      })

      ipcMain.handle(Events.games.list, (_) => {
        return gamesDAO.list();
      })

      ipcMain.handle(Events.systems.list, (_) => {
        return systemsDAO.list();
      })

      ipcMain.handle(Events.systems.create, async (_, event: SystemCreateEvent) => {
        const id = uuid();
        await systemsDAO.create({ ...event.system, id });
        return id;
      })
}

