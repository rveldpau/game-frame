import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { APIContext } from "../../../ui/APIContext"
import { MenuItem } from "../MenuItem"
import { ChangeHandler } from "./ChangeHandler"

import "./FileSelector.scss";

export type FileSelectorProps = {
    value: string,
    onChange: ChangeHandler<string>
}

export function FileSelector({value, onChange}: FileSelectorProps){
    const api = React.useContext(APIContext);
    const selectFile = React.useCallback(() => {
        api.dialogs.selectFileForOpen({
            title: "Select file",
            properties: ["openFile"]
        }).then(result => {
            onChange({value: result[0]})
        })
    }, [api])
    return <div className="file-selector" onClick={selectFile}>
        <div className="file-path" title={value}>{value?.replace(/\\/g, "/").split("/").pop()}</div>
        <div className="file-action"><MenuItem onClick={selectFile} text="Browse" icon={faFolderOpen} /></div>
    </div>
}