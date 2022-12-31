import { Game } from "../game";

export abstract class Launcher {
    abstract launch(game:Game): Promise<void>;
}