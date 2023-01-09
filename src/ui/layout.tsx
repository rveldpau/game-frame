import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { GameList } from "../games/ui/GameList"
import { MainMenu, MainMenuProprties } from "./components/MainMenu"
import { Config } from "./config/config";
import { Home } from "./home";

import 'simplebar-react/dist/simplebar.min.css';
import "./layout.scss";

export function Layout(){
    const [menuState, setMenuState] = React.useState<MainMenuProprties["state"]>("minimized");
    return <div className={`container main menu-${menuState}`}>
        <MainMenu state={menuState} changeMenuState={setMenuState}></MainMenu>
        <SimpleBar className="container content">
            <Routes>
                <Route index element={<Home />} />
                <Route path="snes" element={<GameList title="SNES"  />} />
                <Route path="config/*" element={<Config />} />
            </Routes>
        </SimpleBar>
    </div>
}