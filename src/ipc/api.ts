import { Game } from "../games/game";
import {v4 as uuid} from "uuid";
import { System } from "../games/system";

export type BaseEvent<EventType extends string = string> = { id:string, eventType:EventType };
export type LaunchGameEvent = BaseEvent<"launchGame"> & { game:Game };
export type SystemCreateEvent = BaseEvent<"systemCreate"> & { system:Omit<System, "id"> };

type ExtractEventType<T> = T extends BaseEvent<infer Generic> ? Generic : unknown;
export type Events = LaunchGameEvent;
export type IPCAPI = {
    games: {
        launch: (game:LaunchGameEvent) => Promise<void>
        list: () => Promise<Game[]>
    },
    systems: {
        create: (system:SystemCreateEvent) => Promise<string>
        list: () => Promise<System[]>
    }
}
const _IPCAPIHelpers = {
    wrapEventDetails<EventClass extends BaseEvent>(eventType:ExtractEventType<EventClass>, event:Omit<EventClass, "id"|"eventType">){
        return {
            ...event,
            eventType,
            id: uuid()
        }
    }
}

export const IPCAPIHelpers:typeof _IPCAPIHelpers = _IPCAPIHelpers;
