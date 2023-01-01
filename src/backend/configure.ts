import { createBackendAPI } from "../ipc/backend";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { ipcMain } from "electron";
import { install } from "./install";
import { Sequelize } from "sequelize";
import { GamesDAOSqlLite } from "../games/dataAccess/sqlite/gamesDao.sqlite";
import { SystemsDAOSqlLite } from "../games/dataAccess/sqlite/systemsDao.sqlite";
import { configureSequelize } from "../games/dataAccess/sqlite/setup";

export async function configure(){
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./game-frame.db"
    })

    await configureSequelize(sequelize);

    const daos = {
      systemsDAO: new SystemsDAOSqlLite(sequelize),
      gamesDAO: new GamesDAOSqlLite(sequelize)
    }

    await Promise.all(Object.values(daos).map(dao => dao.initialize()));

    await install(daos);

    createBackendAPI({ipcMain, ...daos});
}