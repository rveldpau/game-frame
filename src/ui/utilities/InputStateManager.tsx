
import React from "react"
import { Statement } from "sqlite3"
import { ChangeHandler, ChangeEvent } from "../components/inputs/ChangeHandler"

export type InputStateManagerProperties<TYPE extends {}> = {
    value?: TYPE,
    onChange?: ChangeHandler<TYPE>,
    validate?: (value: Partial<TYPE>) => string[]
}

export function useInputStateManager<TYPE extends {}>({ value, validate, onChange }: InputStateManagerProperties<TYPE>) {
    const [mutatedValue, setMutatedValue] = React.useState<{ value: Partial<TYPE>, dirty: boolean, messages: string[] }>({ value: value ?? {}, dirty: false, messages: [] })
    const handleChange = React.useCallback((ev: ChangeEvent<Partial<TYPE>>) => {
        setMutatedValue(existingState => {
            const newValue = {
                ...existingState.value,
                ...ev.value
            };
            const messages = validate ? validate(newValue) : [];
            const newState = {
                messages, value: newValue, dirty: ev.value !== value
            };
            
            return newState;
        })
    }, []);

    React.useEffect(() => {
        handleChange({ value: value ?? {} });
    }, [value])


    return {
        ...mutatedValue,
        handleChange,
        valid: mutatedValue.messages.length === 0
    }
}