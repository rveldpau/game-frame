import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "./MenuItem.scss";

export function MenuItem({text, icon, to, onClick}:{text:string, icon: IconProp, to?: string, onClick?: () => void}){
    return <li className="menu-item"><Link to={to} onClick={onClick}><FontAwesomeIcon icon={icon} title={text} /><div className="menu-text">{text}</div></Link></li>
}