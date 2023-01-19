import React from "react";

import "./ArtSelector.scss";
import { ChangeHandler } from "./ChangeHandler";

export function ArtSelector({options, value, onChange, isVideo}:{options?:string[], value?: string, onChange: ChangeHandler<string>, isVideo?:boolean}){

    return <div className="art-selctor">{
        options?.map(option => 
            <div key={option} onClick={() => onChange({value:option})} style={value === option ? { border: "1px solid green"}:{}}>
                {isVideo ? <video src={`media://${option}`} controls muted={true} autoPlay={false}  /> : <img src={`media://${option}`}  /> }
            </div>
        )
        }</div>
}