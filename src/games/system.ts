import { AnyLauncher, Launcher } from "./launchers/launcher";
import { SupportedLauncher } from "./launchers/launchers";

export type System = {
    id: string;
    name: string;
    defaultLauncher: AnyLauncher;
}

export function validateSystem(system:System):string[]{
    const messages = []

    if(!system.name) messages.push("A system needs a name");
    if(!system.defaultLauncher) messages.push("A system needs a default launcher");

    return messages;
}