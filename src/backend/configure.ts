import { createBackendAPI } from "../ipc/backend";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { ipcMain } from "electron";
import Realm from "realm";
import { install } from "./install";

export async function configure(){
    const gamesRealm = await Realm.open({
        schemaVersion: 2,
        schema: [ { name: GamesDAO.GameRealmName, properties: GamesDAO.GameSchemaProperties } ]
      })
      
      const gamesDAO = new GamesDAO(gamesRealm);

      install({gamesDAO});

      createBackendAPI({ipcMain, gamesDAO});
}