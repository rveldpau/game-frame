import { Game } from "../game";
import { AnyLauncher } from "./launcher";

export abstract class LauncherImpl<LauncherType extends AnyLauncher> {
    abstract get id(): LauncherType["id"];
    abstract launch(game:Game, config?:LauncherType["config"]): Promise<void>;
}