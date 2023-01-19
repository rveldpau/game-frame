import { Subscreen } from "../../../ui/components/Subscreen";
import { SystemList } from "../../../games/ui/SystemList";
import { System } from "../../../games/system";
import React from "react";
import { CallToAction, CallToActionProperties } from "../../../ui/components/CallToAction";
import { faGamepad, faPlus, faTv } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../../ui/APIContext";
import { Action, MenuItem, MenuItemProps } from "../../../ui/components/MenuItem";
import { useQuery } from "react-query";
import { ContentLoader, ContentLoaderRendererProps } from "../../../ui/components/ContentLoader";

function SystemsConfigContent({data:systems, createAction}:ContentLoaderRendererProps<System[], {createAction:MenuItemProps}>){
    return  systems && systems.length > 0 ?
        <SystemList systems={systems} />
        :
        <CallToAction
            message="There are currently no systems configured"
            icon={faTv}
            action={createAction} />
}

export function SystemsConfigHome() {
    const api = React.useContext(APIContext);
    const createAction:Action = {
        text: "Create System",
        icon: faPlus,
        to: "new"
    }

    return <Subscreen title={"Systems"} primaryAction={createAction}>
        <ContentLoader load={api.systems.list} render={SystemsConfigContent} createAction={createAction} />
    </Subscreen>
}