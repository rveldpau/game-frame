import { SupportedLauncher } from "./launchers/launchers";

export type Game = {
    id: string;
    name: string;
    path: string;
    images?: {
        box?: string,
    }
    systemId: string;
    launcher?: SupportedLauncher
}

