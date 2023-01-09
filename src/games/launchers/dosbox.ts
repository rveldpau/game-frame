import { Game } from "../game";
import { LauncherImpl } from "./launcherImpl";
import child_process from "child_process";
import { Launcher } from "./launcher";

export type DosboxLauncher = Launcher<"dosbox", {}>;

export class DosboxLauncherImpl extends LauncherImpl<DosboxLauncher> {
    get name(): string {
        return "Dosbox";
    }
    get id(): "dosbox" {
        return "dosbox";
    }
    async launch(game: Game): Promise<void> {
        const spawnedProcess = await child_process.spawn("dosbox", [game.path, "--noconsole", "--exit"])
        return new Promise((resolve, reject) => {
            spawnedProcess.on("exit", resolve);
            spawnedProcess.on("error", reject);
            spawnedProcess.on("message", (message) => console.log(message))
        })
    }

}