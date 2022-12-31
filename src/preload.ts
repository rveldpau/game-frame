// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {ipcRenderer, contextBridge} from "electron";
import { IPCAPI } from "./ipc/api";
import { createUiAPI } from "./ipc/ui";

contextBridge.exposeInMainWorld("api", createUiAPI(ipcRenderer));
contextBridge.exposeInMainWorld("otherThing", {api: createUiAPI(ipcRenderer)} );

declare global {
    interface Window {
      api: IPCAPI;
    }
}