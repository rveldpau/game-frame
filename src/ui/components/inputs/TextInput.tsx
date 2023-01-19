import React, { ChangeEventHandler } from "react"
import { ChangeHandler } from "./ChangeHandler";
export type TextChangeHandler = ChangeHandler<string>;
export type TextInputProperties = {
    value?:string,
    onChange?: TextChangeHandler,
    onFocus?: () => void,
    longText?: boolean
}

import "./input.scss";

export function TextInput({onChange, value, onFocus, longText}: TextInputProperties){
    const textChangeHandler = React.useCallback<ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>>( onChange ? (ev) => {
        onChange({value : ev.target.value});
    } : () => {}, [onChange]);

    const textAreaRef = React.useRef<HTMLTextAreaElement>();
    React.useEffect(() => {
        if(longText){
            textAreaRef.current.value = value;
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 5 + "px";
        }
    }, [value, longText])
    if(longText){
        return <textarea onChange={textChangeHandler} value={value ?? ""} onFocus={onFocus} rows={1} ref={textAreaRef} />
    }else{
        return <input onChange={textChangeHandler} value={value ?? ""} type="text" onFocus={onFocus} />
    }
    
}