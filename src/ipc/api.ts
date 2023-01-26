import { Game, GameWithArt } from "../games/game";
import {v4 as uuid} from "uuid";
import { System } from "../games/system";
import { GameFilters } from "../games/dataAccess/gamesDao";
import { GameDetailLookupResult } from "../games/detailsLookup/GameDetailLookup";

export type LaunchGameEvent = { game:Game };
export type SystemCreateEvent = { system:Omit<System, "id"> };
export type Events = LaunchGameEvent;

export const IPCAPITemplate = {
    games: {
        get: (gameId:Game["id"]) => Promise.resolve<GameWithArt|undefined>(undefined),
        delete: (gameId:Game["id"]) => Promise.resolve(),
        launch: (game:LaunchGameEvent) => Promise.resolve(),
        list: (filters?: GameFilters) => Promise.resolve<Game[]>([]),
        create: (props:{game:Omit<Game, "id">}) => Promise.resolve<string>(""),
        update: (props:{game:Game}) => Promise.resolve(),
        lookupDetails: (game:Partial<Game>) => Promise.resolve<GameDetailLookupResult[]>([])
    } as const,
    systems: {
        create: (system:SystemCreateEvent) => Promise.resolve<string>(""),
        list: () => Promise.resolve<System[]>([])
    } as const,
    dialogs: {
        selectFileForOpen: (props: Electron.OpenDialogOptions) => Promise.resolve([""])
    }
} as const

export type IPCAPI = typeof IPCAPITemplate;
export type SystemsAPI = typeof IPCAPITemplate.systems;
export type GamesAPI = typeof IPCAPITemplate.games;
export type DialogsAPI = typeof IPCAPITemplate.dialogs;