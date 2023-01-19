import { Route, Routes } from "react-router-dom";
import { StandardWidth } from "../../ui/components/StandardWidth";
import { NewGame } from "./AddGame";
import { GamesCatalog } from "./GamesCatalog";

export function GamesManagement():JSX.Element{
    return <StandardWidth>
        <Routes>
            <Route index element={<GamesCatalog />}/>
            <Route path="new" element={<NewGame />}/>
        </Routes>
    </StandardWidth>
}