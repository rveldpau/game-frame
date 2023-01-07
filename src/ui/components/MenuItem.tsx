import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Color } from "../styles";

import "./MenuItem.scss";

type withTarget = {to?: string};
type withFunction = {onClick?: () => void}
export type MenuItemProps = {text:string, icon: IconProp, color?:Color } & (withTarget | withFunction);


export function MenuItem({text, icon, color, ...otherProps}:MenuItemProps){
    return <li className={["menu-item", color && `background-${color}`].join(" ")}>
        <Link to={(otherProps as withTarget).to} onClick={(otherProps as withFunction).onClick}>
            <FontAwesomeIcon icon={icon} title={text} />
            <div className="menu-text">{text}</div>
        </Link>
    </li>
}