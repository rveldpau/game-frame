import React from "react";
import { IPCAPI } from "../ipc/api";

export const APIContext = React.createContext<IPCAPI>(window.api);

export function useAPI(){
    return React.useContext(APIContext);
}