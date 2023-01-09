import { Game } from "../games/game";
import {v4 as uuid} from "uuid";
import { System } from "../games/system";

export type LaunchGameEvent = { game:Game };
export type SystemCreateEvent = { system:Omit<System, "id"> };

export type Events = LaunchGameEvent;

export const IPCAPITemplate = {
    games: {
        launch: (game:LaunchGameEvent) => Promise.resolve(),
        list: () => Promise.resolve<Game[]>([])
    },
    systems: {
        create: (system:SystemCreateEvent) => Promise.resolve<string>(""),
        list: () => Promise.resolve<System[]>([])
    }
}

export type IPCAPI = typeof IPCAPITemplate;
export type SystemsAPI = typeof IPCAPITemplate.systems;
export type GamesAPI = typeof IPCAPITemplate.games;