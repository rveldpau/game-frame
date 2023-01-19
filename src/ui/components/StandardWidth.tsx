import React from "react";

export function StandardWidth({ children }: React.PropsWithChildren<{}>) {
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "800px", width: "100%", position: "relative" }}>
            {children}
        </div>
    </div>
}