import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import "./MainMenu.scss";
import { MenuItem } from "./MenuItem";
import { Menu } from "./Menu";
export type MainMenuStates = "open"|"closed"|"minimized";
export type MainMenuProprties = {
    state: MainMenuStates,
    changeMenuState?: (newState: MainMenuStates) => void
}
export function MainMenu({state, changeMenuState}:MainMenuProprties){
    return <div className={`menu main ${state}`}>
        <Menu>
            <MenuItem to="/" icon={faHouse} text="Home" />
            <MenuItem to="/config" icon={faGear} text="Configure" />
        </Menu>
        <div className="expander">
            <Menu>
                {state === "open" ? 
                <MenuItem text="Collapse" icon={faAnglesLeft} onClick={() => changeMenuState?.("minimized")} />
                : <MenuItem text="Expand" icon={faAnglesRight} onClick={() => changeMenuState?.("open")} />
                }
            </Menu>
        </div>
    </div>
}