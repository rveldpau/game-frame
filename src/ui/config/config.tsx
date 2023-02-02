import { faGamepad, faTv } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { MenuItem } from "../components/MenuItem";
import { Subscreen } from "../components/Subscreen";
import { SystemsConfig } from "./systems/SystemsConfig";
import SimpleBar from "simplebar-react";


export function Config() {
    return <SimpleBar className="container content">
    <Routes>
        <Route path="*" element={<Outlet />}>
            <Route index element={<Subscreen title="Configuration" backLinkTo="/">
                <MenuItem to={"./systems"} text="Systems" icon={faTv} />
            </Subscreen>} />
            <Route path="systems/*" element={<SystemsConfig />} />
        </Route>
    </Routes>
    </SimpleBar>
}