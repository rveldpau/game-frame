import { ChangeHandler } from "./ChangeHandler";
import "./Toggle.scss";

export function Toggle({value, onChange}: {value?:boolean, onChange:ChangeHandler<boolean>}){
    return <div className={["toggle", value ? "selected" : "not-selected"].join(" ")} onClick={() => onChange({value:!value})}>
        <div className="indicator"></div>
    </div>
}