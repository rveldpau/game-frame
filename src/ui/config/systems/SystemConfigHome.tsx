import { Subscreen } from "../../../ui/components/Subscreen";
import { SystemList } from "../../../games/ui/SystemList";
import { System } from "../../../games/system";
import React from "react";
import { CallToAction } from "../../../ui/components/CallToAction";
import { faGamepad, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../../ui/APIContext";
import { Action, MenuItem } from "../../../ui/components/MenuItem";

export function SystemsConfigHome() {
    const api = React.useContext(APIContext);
    const createAction:Action = {
        text: "Create System",
        icon: faPlus,
        to: "new"
    }
    const [systems, setSystems] = React.useState<System[]>([])
    React.useEffect(() => {
        api.systems.list().then(setSystems);
    }, [api])
    return <Subscreen title={"Systems"} primaryAction={systems.length > 0 ? createAction : undefined}>
        { systems && systems.length > 0 ?
            <SystemList systems={systems} />
            :
            <CallToAction
                message="There are currently no systems configured"
                icon={faGamepad}
                action={createAction} />
        }
    </Subscreen>
}