import { IPCAPI, IPCAPITemplate, ProgressiveUpdate, IntermediateProgressiveUpdate } from "./api";

export type IpcRendererCompatible = {
    send: (channel:string, ...args:any[]) => void,
    removeAllListeners: (channel: string) => void,
    addListener: (channel:string, callback: (...args:any[]) => void) => void;
    postMessage: (channel:string, message: unknown, ports: MessagePort[]) => void;
    invoke<TYPE = any>(channel: string, ...args: any[]): Promise<TYPE>;
}

function generateAPIBridge<GROUP extends keyof IPCAPI>(group:GROUP, methodKey:keyof IPCAPI[GROUP], ipcRenderer: IpcRendererCompatible){
    const functionKey = `${group}:${methodKey as string}`;
    const result = (IPCAPITemplate[group][methodKey] as any)();
    if(result.next && result.return && result.throw){
        return (...args:any[]) => {
            console.log("Creating Message Channel for " + functionKey);
            const {port1, port2} = new MessageChannel();
            console.log("CStarting ports");
            port1.start();
            console.log("Creating iterator");
            const iter = async function*(){
                console.log(`Listening to ${functionKey}`)
                while(1){
                    const result = await new Promise<ProgressiveUpdate<unknown>>(res => {
                        port1.onmessage = (messageEvent:MessageEvent<ProgressiveUpdate<unknown>>) => {
                            res(messageEvent.data);
                        }
                    });
                    if(result.final){
                        return result;
                    }else{
                        yield result;
                    }
                }
            }()
            console.log("Iterator created, now returning");
            ipcRenderer.postMessage(functionKey, {args}, [port2])
            return iter;
        }
    }else{
        return async (...args:any[]) => {
            return await ipcRenderer.invoke(functionKey, ...args);
        }
    }
    
}

export const createUiAPI: (ipcRenderer: IpcRendererCompatible) => IPCAPI = (ipcRenderer) => {
    return (Object.entries(IPCAPITemplate) as [keyof IPCAPI, IPCAPI[keyof IPCAPI]][]).reduce((api, [group, methods]) => ({
        ...api,
        [group]: (Object.keys(methods) as (keyof IPCAPI[keyof IPCAPI])[]).reduce((groupMethods, methodKey) => ({
            ...groupMethods,
            [methodKey]: generateAPIBridge(group, methodKey, ipcRenderer)
        }), {} as IPCAPI[keyof IPCAPI])
    }), {} as IPCAPI)
}

