import { PropsWithChildren } from "react";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { Action, MenuItem } from "./MenuItem";

import "./Subscreen.scss";
import { Menu } from "./Menu";

export type SubscreenProperties = PropsWithChildren<{
    title:string,
    backLinkTo?: string,
    primaryAction?: Action,
    secondaryAction?: Action,
}>;

export function Subscreen({title, backLinkTo, children, primaryAction, secondaryAction}:SubscreenProperties) {
    return <div className="subscreen">
        <div className="back"><MenuItem to={ backLinkTo ?? ".." } text="Back" icon={faCaretLeft} /></div>
        <div className="header">
            <div className="title"><h1>{title}</h1></div>
            {primaryAction && <div className="action primary">
                <MenuItem {...primaryAction} />
            </div>}
            {secondaryAction && <div className="action secondary">
                <MenuItem {...secondaryAction} />
            </div>}
        </div>
        <div className="subscreen-content">
            {children}
        </div>
    </div>
}
