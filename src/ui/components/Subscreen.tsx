import { PropsWithChildren } from "react";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { MenuItem } from "./MenuItem";

import "./Subscreen.scss";
import { Menu } from "./Menu";

export type SubscreenProperties = PropsWithChildren<{
    title:string,
    backLinkTo?: string
}>;

export function Subscreen({title, backLinkTo, children}:SubscreenProperties) {
    return <div className="subscreen">
        <div className="back"><MenuItem to={ backLinkTo ?? ".." } text="Back" icon={faCaretLeft} /></div>
        <div className="header">
            <div className="title"><h1>{title}</h1></div>
            
        </div>
        <div className="content">
            {children}
        </div>
    </div>
}