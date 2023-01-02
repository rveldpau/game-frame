import React from "react";
import "./SafeFrame.scss";
export function SafeFrame({children}:React.PropsWithChildren){
    return <div className="safe-frame" style={{margin: "5vh 5vw"}}>
        {children}
    </div>
}