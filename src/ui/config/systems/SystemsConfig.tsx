import { Subscreen } from "../../../ui/components/Subscreen";
import { SystemList } from "../../../games/ui/SystemList";
import { System } from "../../../games/system";
import React from "react";
import { CallToAction } from "../../../ui/components/CallToAction";
import { faGamepad, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import { SystemsConfigHome } from "./SystemConfigHome";
import { NewSystem } from "./NewSystem";

export function SystemsConfig() {
    return <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{maxWidth: "800px", width:"100%", position:"relative"}}>
            <Routes>
                <Route index element={<SystemsConfigHome />} />
                <Route path="new" element={<NewSystem />} />
            </Routes>
        </div>
    </div>
}