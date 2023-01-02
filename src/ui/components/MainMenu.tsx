import "./MainMenu.scss";
export type MainMenuStates = "open"|"closed"|"minimized";
export type MainMenuProprties = {
    state: MainMenuStates,
    changeMenuState?: (newState: MainMenuStates) => void
}
export function MainMenu({state, changeMenuState}:MainMenuProprties){
    return <div className={`menu main ${state}`}>
        <div className="expander">
            {state === "minimized" && <button onClick={() => changeMenuState?.("open")}>»</button> }
            {state === "open" && <button onClick={() => changeMenuState?.("minimized")}>« Collapse</button> }
        </div>
    </div>
}