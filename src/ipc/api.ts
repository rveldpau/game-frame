import { Game, GameWithArt } from "../games/game";
import {stringify, v4 as uuid} from "uuid";
import { System } from "../games/system";
import { GameFilters } from "../games/dataAccess/gamesDao";
import { GameDetailLookupResult } from "../games/detailsLookup/GameDetailLookup";
import path from "path";
import { SupportedImporter } from "../games/importers/importers";
import { ImportResult } from "../games/importers/importerImpl";

export type ProgressiveUpdateBase<FINAL extends boolean, TYPE> = {
    progress:number,
    final: FINAL,
    data: TYPE
};
export type IntermediateProgressiveUpdate<TYPE> = ProgressiveUpdateBase<false, TYPE>
export type FinalProgressiveUpdate<TYPE> = ProgressiveUpdateBase<true, TYPE>
export type ProgressiveUpdate<TYPE> = IntermediateProgressiveUpdate<TYPE> | FinalProgressiveUpdate<TYPE>
function ProgressiveUpdateTemplate<TYPE>(data:TYPE): AsyncGenerator<ProgressiveUpdate<TYPE>> {
    const flaggedGenerator = async function*(){
        return {
            data: undefined as TYPE,
            final: false,
            progress: 1
        } as ProgressiveUpdate<TYPE>
    }();
    (flaggedGenerator as any)._PROGRESSIVE
    return flaggedGenerator;
}

export type LaunchGameEvent = { game:Game };
export type SystemCreateEvent = { system:Omit<System, "id"> };
export type Events = LaunchGameEvent;
export type SelectedFile = {
    path:string,
    dir: string,
    name: string
}

export const IPCAPITemplate = {
    games: {
        get: (gameId:Game["id"]) => Promise.resolve<GameWithArt|undefined>(undefined),
        delete: (gameId:Game["id"]) => Promise.resolve(),
        launch: (game:LaunchGameEvent) => Promise.resolve(),
        list: (filters?: GameFilters) => Promise.resolve<Game[]>([]),
        create: (props:{game:Omit<Game, "id">}) => Promise.resolve<string>(""),
        import: (importer:SupportedImporter) => ProgressiveUpdateTemplate<ImportResult>({gameCount: 0}),
        update: (props:{game:Game}) => Promise.resolve(),
        lookupDetails: (game:Partial<Game>) => Promise.resolve<GameDetailLookupResult[]>([])
    } as const,
    systems: {
        create: (system:SystemCreateEvent) => Promise.resolve<string>(""),
        list: () => Promise.resolve<System[]>([])
    } as const,
    dialogs: {
        selectFileForOpen: (props: Electron.OpenDialogOptions) => Promise.resolve([{path:"", ...path.parse(__dirname)}] as SelectedFile[])
    }
} as const

export type IPCAPI = typeof IPCAPITemplate;
export type SystemsAPI = typeof IPCAPITemplate.systems;
export type GamesAPI = typeof IPCAPITemplate.games;
export type DialogsAPI = typeof IPCAPITemplate.dialogs;