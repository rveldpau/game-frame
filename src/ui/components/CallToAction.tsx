import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MenuItem, MenuItemProps } from "./MenuItem"

import "./CallToAction.scss";

export type CallToActionProperties = {icon:IconProp, message:string, action: MenuItemProps}
export function CallToAction({icon, message, action}: CallToActionProperties){
    return <div className="call-to-action">
        <div className="icon">
            <FontAwesomeIcon icon={icon} />
        </div>
        <div className="message">
            {message}
        </div>
        <div className="action">
            <MenuItem { ...{color: "accent", ...action}} />
        </div>
    </div>
}