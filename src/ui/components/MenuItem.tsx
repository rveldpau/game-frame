import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Color } from "../styles";

import "./MenuItem.scss";


export type Action = {
    text:string, 
    icon: IconProp, 
    color?:Color,
} & (withTarget | withFunction)

type withTarget = {to?: string};
type withFunction = {onClick?: () => void}
export type MenuItemProps = {
    text:string, 
    icon: IconProp, 
    color?:Color,
    disabled?: boolean,
    alert?: {
        icon: IconProp,
        iconAttributes?: Omit<FontAwesomeIconProps, "icon">,
        color?: Color,
        message: string
    }
} & (withTarget | withFunction);


export function MenuItem({text, icon, color, disabled, alert, ...otherProps}:MenuItemProps){
    return <li className={["menu-item", "hoverable", alert && "alert", disabled && "disabled", color && `background-${color}`].join(" ")}>
        <Link to={!disabled && (otherProps as withTarget).to} onClick={!disabled && (otherProps as withFunction).onClick}>
            <FontAwesomeIcon icon={icon} title={text} />
            <div className="menu-text">
                {text}
            </div>
                <div className="alert-container">
                {alert && 
                    <FontAwesomeIcon icon={alert.icon} title={alert.message} color="#900" {...alert.iconAttributes??{}} />
                }
                </div>
        </Link>
    </li>
}