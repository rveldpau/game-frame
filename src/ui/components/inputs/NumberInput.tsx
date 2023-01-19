import React, { ChangeEventHandler } from "react"
import { ChangeHandler } from "./ChangeHandler";
export type NumberChangeHandler = ChangeHandler<number>;
export type NumberInputProperties = {
    value?:number,
    onChange?: NumberChangeHandler,
    onFocus?: () => void,
    allowDecimal?: boolean
}

import "./input.scss";

export function NumberInput({onChange, value, onFocus, allowDecimal}: NumberInputProperties){
    const textChangeHandler = React.useCallback<ChangeEventHandler<HTMLInputElement>>( onChange ? (ev) => {
        const number = (allowDecimal ? parseFloat : parseInt)(ev.target.value);
        if (!isNaN(number)){
            onChange({value : number});
        }
    } : () => {}, [onChange])
    return <input onChange={textChangeHandler} value={value ?? ""} type="number" onFocus={onFocus} />
}