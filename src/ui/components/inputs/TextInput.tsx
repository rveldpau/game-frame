import React, { ChangeEventHandler } from "react"
import { ChangeHandler } from "./ChangeHandler";
export type TextChangeHandler = ChangeHandler<string>;
export type TextInputProperties = {
    value?:string,
    onChange?: TextChangeHandler,
    onFocus?: () => void
}

import "./input.scss";

export function TextInput({onChange, value, onFocus}: TextInputProperties){
    const textChangeHandler = React.useCallback<ChangeEventHandler<HTMLInputElement>>( onChange ? (ev) => {
        onChange({value : ev.target.value});
    } : () => {}, [onChange])
    return <input onChange={textChangeHandler} value={value ?? ""} type="text" onFocus={onFocus} />
}