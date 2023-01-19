import { SupportedLauncher } from "./launchers/launchers";

export type GameWithArt = Game & {
    art?: {
        box?: string,
        cart?: string,
        logo?: string,
        snapshot?: string,
        gameplayVideo?: string
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

export function validateGame(game:Game):string[]{
    const messages = []

    if(!game.name) messages.push("A game needs a name");
    if(!game.path) messages.push("A game needs a path");
    if(!game.systemId) messages.push("A game needs a system");

    return messages;
}
