import { IPCAPI, IPCAPITemplate, LaunchGameEvent, SystemCreateEvent } from "./api";
import { IpcMain, ipcRenderer } from "electron";
import { Events } from "./events";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SupportedLauncher, SupportedLaunchers } from "../games/launchers/launchers";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { v4 as uuid} from "uuid";
import { BackendAPI } from "./backendAPI";

export const createBackendAPI: (dependencies:{
    ipcMain: IpcMain,
    gamesDAO: GamesDAO,
    systemsDAO: SystemsDAO,
}) => void = ({ipcMain, gamesDAO, systemsDAO}) => {
    const backendAPI = new BackendAPI(gamesDAO, systemsDAO);
    return Object.entries(IPCAPITemplate).forEach(([group, methods]) => {
      console.log("Groups",`${group}`)
      Object.keys(methods).forEach(method => {
        console.log("Group Method",`${group}:${method}`)
        ipcMain.handle(`${group}:${method}`, (_: any, ...args:Parameters<IPCAPI[keyof IPCAPI][keyof IPCAPI[keyof IPCAPI]]>) => 
          backendAPI[group as keyof IPCAPI][method as keyof IPCAPI[keyof IPCAPI]](...args))
      })
    })
}

