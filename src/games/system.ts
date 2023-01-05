import { Launcher } from "./launchers/launcher";
import { SupportedLauncher } from "./launchers/launchers";

export type System = {
    id: string;
    name: string;
    defaultLauncher: SupportedLauncher;
}

