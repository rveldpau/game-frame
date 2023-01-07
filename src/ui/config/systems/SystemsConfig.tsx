import { Subscreen } from "../../../ui/components/Subscreen";
import { SystemList } from "../../../games/ui/SystemList";
import { System } from "../../../games/system";
import React from "react";
import { CallToAction } from "../../../ui/components/CallToAction";
import { faGamepad, faPlus } from "@fortawesome/free-solid-svg-icons";

export function SystemsConfig() {
    const [systems, setSystems] = React.useState<System[]>()
    return <Subscreen title={"Systems"}>
        { systems && systems.length > 0 ?
            <SystemList systems={systems} />
            :
            <CallToAction
                message="There are currently no systems configured"
                icon={faGamepad}
                action={{
                    icon:faPlus,
                    text: "Create System",
                    onClick: () => alert("New System!")
                }} />
        }
    </Subscreen>
}