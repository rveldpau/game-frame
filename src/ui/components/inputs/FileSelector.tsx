import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { FileFilter } from "electron"
import React from "react"
import { APIContext } from "../../../ui/APIContext"
import { MenuItem } from "../MenuItem"
import { ChangeHandler } from "./ChangeHandler"

import "./FileSelector.scss";

export type FileSelectorProps = {
    value: string,
    title?: string,
    filters?: FileFilter[],
    defaultPath?: string,
    onChange: ChangeHandler<string>
}

let lastPath:string|undefined = undefined;

export function FileSelector({value, onChange, title, filters, defaultPath}: FileSelectorProps){
    const api = React.useContext(APIContext);
    const selectFile = React.useCallback(() => {
        api.dialogs.selectFileForOpen({
            title: title ?? "Select file",
            filters,
            defaultPath: defaultPath ?? lastPath,
            properties: ["openFile"]
        }).then(result => {
            const file = result[0];
            if(file.path){
                console.log("Selected", file)
                lastPath = file.dir;
                onChange({value: file.path})
            }
            
        })
    }, [api])
    return <div className="file-selector" onClick={selectFile}>
        <div className="file-path" title={value}>{value?.replace(/\\/g, "/").split("/").pop()}</div>
        <div className="file-action"><MenuItem text="Browse" icon={faFolderOpen} /></div>
    </div>
}