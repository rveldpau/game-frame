import { createBackendAPI } from "../ipc/backend";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { ipcMain } from "electron";
import { install } from "./install";
import { Sequelize } from "sequelize";
import { GamesDAOSqlLite } from "../games/dataAccess/gamesDao.sqlite";

export async function configure(){
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./game-frame.db"
    })

    const gamesDAO = new GamesDAOSqlLite(sequelize);
    
    gamesDAO.initialize();

    install({gamesDAO});

    createBackendAPI({ipcMain, gamesDAO});
}