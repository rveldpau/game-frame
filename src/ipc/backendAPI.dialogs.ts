import { DialogsAPI, SelectedFile } from "./api";
import { BrowserWindow, dialog } from "electron";
import path from "path";

export class BackendAPIDialog implements DialogsAPI{
    constructor(
    ){}
    async selectFileForOpen(props:Electron.OpenDialogOptions):Promise<SelectedFile[]> {
        const window = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
        const result = await dialog.showOpenDialog(window, props)
        return result.filePaths.map(filePath => ({path: filePath, ...path.parse(filePath)}));
    }
}