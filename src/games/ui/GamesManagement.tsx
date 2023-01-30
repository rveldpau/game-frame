import { Route, Routes } from "react-router-dom";
import { StandardWidth } from "../../ui/components/StandardWidth";
import { NewGame } from "./AddGame";
import { EditGameLoader } from "./EditGameLoader";
import { GamesCatalog } from "./GamesCatalog";
import { GamesImport } from "./import/GamesImport";

export function GamesManagement():JSX.Element{
    return <StandardWidth>
        <Routes>
            <Route index element={<GamesCatalog />}/>
            <Route path="new" element={<NewGame />}/>
            <Route path="import/*" element={<GamesImport />}/>
            <Route path=":gameId" element={<EditGameLoader />}/>
        </Routes>
    </StandardWidth>
}