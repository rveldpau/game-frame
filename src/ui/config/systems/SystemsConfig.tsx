import { Route, Routes } from "react-router-dom";
import { SystemsConfigHome } from "./SystemConfigHome";
import { NewSystem } from "./NewSystem";
import { StandardWidth } from "../../../ui/components/StandardWidth";

export function SystemsConfig() {
    return <StandardWidth>
            <Routes>
                <Route index element={<SystemsConfigHome />} />
                <Route path="new" element={<NewSystem />} />
            </Routes>
        </StandardWidth>
}