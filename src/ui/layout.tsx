import React from "react";
import { GameList } from "../games/ui/GameList"
import { MainMenu, MainMenuProprties } from "./components/MainMenu"

import "./layout.scss";

export function Layout(){
    const [menuState, setMenuState] = React.useState<MainMenuProprties["state"]>("minimized");
    return <div className={`container main menu-${menuState}`}>
        <MainMenu state={menuState} changeMenuState={setMenuState}></MainMenu>
        <div className="container content">
            <GameList title="DOS Games" listGames={window.api.games.list} />
            <GameList title="Arcade Games" listGames={window.api.games.list} />
            <GameList title="N64 Games" listGames={window.api.games.list} />
            <GameList title="NES Games" listGames={window.api.games.list} />
        </div>
    </div>
}