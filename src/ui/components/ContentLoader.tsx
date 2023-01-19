import React from "react"
import { useQuery } from "react-query";

export type ContentLoaderRendererProps<TYPE, AdditionalProps extends Record<string, unknown> = {}> = { data: TYPE } & AdditionalProps

export type ContentLoaderProperties<TYPE, AdditionalProps extends Record<string, unknown> = {}> = {
    load: () => Promise<TYPE>
    queryKey?: string
    render: (props: ContentLoaderRendererProps<TYPE, AdditionalProps>) => JSX.Element
} & AdditionalProps

export function ContentLoader<TYPE, AdditionalProps extends Record<string, unknown> = {}>
    ({ load, queryKey, render:Render, ...additionalProps }: ContentLoaderProperties<TYPE, AdditionalProps>) {
    const id = React.useMemo(() => queryKey ?? String(Math.random()), [queryKey]);
    const { isLoading, error, data } = useQuery(id, load)
        
    if (isLoading) {
        return <div>Loading</div>
    } else if (error) {
        return <div>Failed to load</div>
    }
    else {
        return <Render data={data} {...additionalProps as unknown as AdditionalProps} />
    }

}