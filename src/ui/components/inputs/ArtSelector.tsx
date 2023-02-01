import { faCaretDown, faCaretUp, faCircleXmark, faClose, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { APIContext } from "../../APIContext";
import { NoArt } from "../NoArt";

import "./ArtSelector.scss";
import { ChangeHandler } from "./ChangeHandler";

type ArtRenderer = (props: { 
    path: string,
    onClick?: (...args:any[]) => any,
    title?: string
}) => JSX.Element;
type ArtSelectorProps = {
    options?: string[],
    value?: string,
    onChange: ChangeHandler<string>,
    isVideo?: boolean
    dropdownPosition?: "top" | "bottom"
}
const VideoRenderer: ArtRenderer = ({ path, onClick, title }) => {
    return <video src={`media://${path}`} 
        muted={true} 
        autoPlay={false} 
        onClick={onClick} 
        title={title}
        onMouseOver={(ev) => (ev.target as HTMLVideoElement).play() }
        onMouseOut={(ev) => (ev.target as HTMLVideoElement).pause() }
     />
}
const ImageRenderer: ArtRenderer = ({ path, onClick, title }) => <img src={`media://${path}`} title={title} onClick={onClick} />

export function ArtSelector({ options, value, onChange, isVideo, dropdownPosition }: ArtSelectorProps) {
    const Renderer: ArtRenderer = isVideo ? VideoRenderer : ImageRenderer;

    const api = React.useContext(APIContext);
    const selectFile = React.useCallback(() => {
        console.log("Opening File Selector");
        api.dialogs.selectFileForOpen({
            title: "Select file",
            properties: ["openFile"]
        }).then(result => {
            setIsOpen(false);
            onChange({value: result[0].path});
        })
    }, [api])

    const [isOpen, setIsOpen] = React.useState(false);
    const openDropdown = React.useCallback(() => { setIsOpen(true)}, [])
    const handleChangeValue = React.useCallback((newValue?:string) => {
        setIsOpen(false);
        console.log("New Value", newValue);
        onChange({value:newValue});
    }, [])
    return <div className={`art-selector open-${dropdownPosition === "top" ? "up" : "down"}`}>
        <div className={`dropdown-indicator ${options?.length ? "options" : ""}`}><FontAwesomeIcon icon={dropdownPosition === "top" ? faCaretUp : faCaretDown} /></div>
        <div className="content" onClick={openDropdown}>
            {value ? <Renderer path={value} title={value} /> : <NoArt title={"No art selected"}/>}    
        </div>
        <div className={`options-dropdown ${isOpen?"open":"closed"}`}>
            <NoArt onClick={() => handleChangeValue(null)} icon={faCircleXmark} title={"No art"}/>
            <FontAwesomeIcon icon={faFileArrowUp} onClick={selectFile} className="no-art" />
            {value && <Renderer key={value} path={value} onClick={() => handleChangeValue(value)} title={value} /> }
            {
            options.filter(option => option !== value).map(option =>
                <Renderer key={option} path={option} title={option} onClick={() => handleChangeValue(option)} />
            )
        }
        </div>
    </div>
}