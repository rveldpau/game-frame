import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { GameScroller } from "../games/ui/GameScroller"
import { MainMenu, MainMenuProprties } from "./components/MainMenu"
import { Config } from "./config/config";
import { Home } from "./home";

import 'simplebar-react/dist/simplebar.min.css';
import "./layout.scss";
import { GamesManagement } from "../games/ui/GamesManagement";

export function Layout(){
    const [menuState, setMenuState] = React.useState<MainMenuProprties["state"]>("minimized");
    return <div className={`container main menu-${menuState}`}>
        <MainMenu state={menuState} changeMenuState={setMenuState}></MainMenu>
            <Routes>
                <Route index element={<Home />} />
                <Route path="config/*" element={<Config />} />
                <Route path="games/*" element={<GamesManagement />} />
            </Routes>
    </div>
}