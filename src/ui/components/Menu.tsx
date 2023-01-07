import { PropsWithChildren } from "react";
import "./Menu.scss";

export function Menu({children}: PropsWithChildren<{}>){
    return <ul className="menu">
        {children}
    </ul>
}