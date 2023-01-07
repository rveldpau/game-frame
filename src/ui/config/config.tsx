import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Subscreen } from "../components/Subscreen";
import { SystemsConfig } from "./systems/SystemsConfig";

export function Config() {
    return <Routes>
        <Route path="*" element={<Outlet />}>
            <Route index element={<Subscreen title="Configuration" backLinkTo="/">
                <Link to={"./systems"}>Systems</Link>
            </Subscreen>} />
            <Route path="systems" element={<SystemsConfig />} />
        </Route>
    </Routes>
}