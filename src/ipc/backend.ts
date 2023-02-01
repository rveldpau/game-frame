import { IPCAPI, IPCAPITemplate, ProgressiveUpdate, IntermediateProgressiveUpdate } from "./api";
import { BrowserWindow, dialog, IpcMain } from "electron";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { BackendAPI } from "./backendAPI";
import { GameDetailLookup } from "../games/detailsLookup/GameDetailLookup";
import { ImporterImpl } from "../games/importers/importerImpl";

export const createBackendAPI: (dependencies: {
  ipcMain: IpcMain,
  gamesDAO: GamesDAO,
  systemsDAO: SystemsDAO,
  detailLookups: GameDetailLookup[],
  importers: ImporterImpl[]
}) => void = ({ ipcMain, gamesDAO, systemsDAO, detailLookups, importers }) => {
  const backendAPI = new BackendAPI(gamesDAO, systemsDAO, detailLookups, importers);
  function handleGroupMapping<GROUPKEY extends keyof IPCAPI>([group, methods]: [GROUPKEY, IPCAPI[GROUPKEY]]) {
    console.log("Groups", `${group}`);
    (Object.keys(methods) as unknown as (keyof IPCAPI[GROUPKEY])[]).forEach(method => {
      registerMethodHandler(group, method);
    })
  }

  function registerMethodHandler<
    GROUPKEY extends keyof IPCAPI,
    METHODKEY extends keyof (IPCAPI[GROUPKEY])
  >(group: GROUPKEY, method: METHODKEY) {
    const functionKey = `${group}:${method as string}`;
    console.log("Group Method  -->", functionKey)
    console.log("Result", );
    const result = (IPCAPITemplate[group][method] as any)();
    if(result.next && result.return && result.throw){
    //if((IPCAPITemplate[group][method] as any)()._PROGRESSIVE){
      console.log("\tHas Progressive Updates");
      ipcMain.on(functionKey, async (e, message) => {
        console.log("On", functionKey);
        const [port] = e.ports;
        console.log(e.ports);
        const iter = await ((backendAPI[group][method] as any)(...message.args) as AsyncGenerator<ProgressiveUpdate<unknown>>);
        let result = await iter.next(); 
        console.log(`First result of ${functionKey} is`, result);
        while(!result.done){
          console.log(`Intermediate result on channel ${functionKey} recieved`, result);
          port.postMessage(result.value);
          result = await (iter.next());
        }
        console.log(`Final result on channel ${functionKey} recieved`, result);
        port.postMessage({ ...result.value, final:true } );
        console.log(`Closing port for ${functionKey}`);
        port.close();
      })
      console.log("Registered on " + functionKey)
    }else{
      console.log("Handling ", functionKey);
      ipcMain.handle(functionKey, (_: any, ...args: any[]) => (backendAPI[group][method] as any)(...args))
    }
    
    
  }

  return Object.entries(IPCAPITemplate).forEach(handleGroupMapping);
}

