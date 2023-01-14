import { IPCAPI, IPCAPITemplate } from "./api";
import { BrowserWindow, dialog, IpcMain } from "electron";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { BackendAPI } from "./backendAPI";
import { GameDetailLookup } from "../games/detailsLookup/GameDetailLookup";

export const createBackendAPI: (dependencies: {
  ipcMain: IpcMain,
  gamesDAO: GamesDAO,
  systemsDAO: SystemsDAO,
  detailLookups: GameDetailLookup[],
}) => void = ({ ipcMain, gamesDAO, systemsDAO, detailLookups }) => {
  const backendAPI = new BackendAPI(gamesDAO, systemsDAO, detailLookups);
  function handleGroupMapping<GROUPKEY extends keyof IPCAPI>([group, methods]: [GROUPKEY, IPCAPI[GROUPKEY]]) {
    console.log("Groups", `${group}`);
    (Object.keys(methods) as unknown as (keyof IPCAPI[GROUPKEY])[]).forEach(method => {
      registerMethodHandler(group, method);
    })
  }

  function registerMethodHandler<
    GROUPKEY extends keyof IPCAPI,
    METHODKEY extends keyof (IPCAPI[GROUPKEY])
  >(group: GROUPKEY, method: METHODKEY) {
    console.log("Group Method  -->", `${group}:${method as string}`)
    ipcMain.handle(`${group}:${method as string}`, (_: any, ...args: any[]) => (backendAPI[group][method] as any)(...args))
  }

  return Object.entries(IPCAPITemplate).forEach(handleGroupMapping);
}

