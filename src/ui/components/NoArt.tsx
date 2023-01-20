import { Icon } from "@fortawesome/fontawesome-svg-core";
import { faPhotoFilm, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./NoArt.scss";
export type NoArtProperties = {
    className?: string
    onClick?: (...args:any[]) => any
    icon?: IconDefinition
    title?: string
}
export function NoArt({className, onClick, icon, title}: NoArtProperties) {
    return <FontAwesomeIcon className={`no-art ${className}`} onClick={onClick} icon={icon ?? faPhotoFilm} title={title} />
} 