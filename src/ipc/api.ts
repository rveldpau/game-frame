import { Game } from "../games/game";
import {v4 as uuid} from "uuid";

export type BaseEvent<EventType extends string = string> = { id:string, eventType:EventType };
export type LaunchGameEvent = BaseEvent<"launchGame"> & { game:Game };

type ExtractEventType<T> = T extends BaseEvent<infer Generic> ? Generic : unknown;
export type Events = LaunchGameEvent;
export type IPCAPI = {
    games: {
        launch: (game:LaunchGameEvent) => Promise<void>
        list: () => Promise<Game[]>
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
