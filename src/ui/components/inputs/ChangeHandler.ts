export type ChangeEvent<TYPE> = { value:TYPE }
export type ChangeHandler<TYPE> = (event: ChangeEvent<TYPE>) => void;