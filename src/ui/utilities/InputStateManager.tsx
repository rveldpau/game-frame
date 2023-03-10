
import React from "react"
import { ChangeHandler, ChangeEvent } from "../components/inputs/ChangeHandler"
import { merge } from "lodash";

export type InputStateManagerProperties<TYPE extends {}> = {
    value?: TYPE,
    validate?: (value: Partial<TYPE>) => string[]
}

export function useInputStateManager<TYPE extends {}>({ value, validate }: InputStateManagerProperties<TYPE>) {
    const [mutatedValue, setMutatedValue] = React.useState<{ value: Partial<TYPE>, dirty: boolean, messages: string[] }>({ value: value ?? {}, dirty: false, messages: [] })
    const handleChange = React.useCallback((ev: ChangeEvent<Partial<TYPE>>) => {
        setMutatedValue(existingState => {
            const newValue = merge( {}, existingState.value, ev.value );
            const messages = validate ? validate(newValue) : [];
            const newState = {
                messages, value: newValue, dirty: ev.value !== value
            };
            
            return newState;
        })
    }, [validate]);

    React.useEffect(() => {
        handleChange({ value: value ?? {} });
    }, [value, validate])


    return {
        ...mutatedValue,
        handleChange,
        valid: mutatedValue.messages.length === 0
    }
}