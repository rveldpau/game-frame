import { Game } from "../games/game";
import { IPCAPI, LaunchGameEvent } from "./api";
import { Events } from "./events";

export type IpcRendererCompatible = {
    send: (channel:string, ...args:any[]) => void,
    removeAllListeners: (channel: string) => void,
    addListener: (channel:string, callback: (...args:any[]) => void) => void;
    invoke<TYPE = any>(channel: string, ...args: any[]): Promise<TYPE>;
}

export const createUiAPI: (ipcRenderer: IpcRendererCompatible) => IPCAPI = (ipcRenderer) => {
    return {
        games: {
            async list(): Promise<Game[]> {
                return await ipcRenderer.invoke(Events.games.list);
            },
            async launch(event: LaunchGameEvent): Promise<void> {
                console.log("Launching " + event.game.path);
                await ipcRenderer.invoke(Events.games.launch, event);
            }
        }
        
    }
    
}

