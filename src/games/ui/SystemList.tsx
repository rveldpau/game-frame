import { System } from "../system"

export type SystemListProps = {
    systems:System[]
}
export function SystemList({systems}:SystemListProps){
    return <div className="systemList">
        {systems.map(system => <div>{system.name}</div>)}
    </div>
}