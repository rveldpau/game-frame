import { SupportedLauncher } from "./launchers/launchers";

export type GameArtInfo = {
    video: boolean,
    path: string
};

export type GameWithArt = Game & {
    art?: {
        box?: GameArtInfo,
        cart?: GameArtInfo,
        logo?: GameArtInfo,
        snapshot?: GameArtInfo
    }
}

export type Game = {
    id: string;
    name: string;
    path: string;
    systemId: string;
    launcher?: SupportedLauncher;
    details?: {
        year?: number,
        maxPlayer?: number
        plot?: string,
        publisher?: string,
        developer?: string,
        genre?: string
    }
}

