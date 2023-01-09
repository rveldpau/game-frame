import { System } from "../games/system";
import { Game } from "../games/game";
import { IPCAPI, IPCAPITemplate, LaunchGameEvent } from "./api";
import { Events } from "./events";

export type IpcRendererCompatible = {
    send: (channel:string, ...args:any[]) => void,
    removeAllListeners: (channel: string) => void,
    addListener: (channel:string, callback: (...args:any[]) => void) => void;
    invoke<TYPE = any>(channel: string, ...args: any[]): Promise<TYPE>;
}

export const createUiAPI: (ipcRenderer: IpcRendererCompatible) => IPCAPI = (ipcRenderer) => {
    return Object.entries(IPCAPITemplate).reduce((api, [group, methods]) => ({
        ...api,
        [group]: Object.entries(methods).reduce((groupMethods, [methodKey, method]) => ({
            ...groupMethods,
            [methodKey]: async (...args:any[]) => {
                return await ipcRenderer.invoke(`${group}:${methodKey}`, ...args);
            }
        }), {} as IPCAPI[keyof IPCAPI])
    }), {} as IPCAPI)
}

