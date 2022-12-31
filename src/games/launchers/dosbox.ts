import { Game } from "../game";
import { Launcher } from "./launcher";
import child_process from "child_process";

export class DosboxLauncher extends Launcher {
    async launch(game: Game): Promise<void> {
        const spawnedProcess = await child_process.spawn("dosbox", [game.path, "--noconsole", "--exit"])
        return new Promise((resolve, reject) => {
            spawnedProcess.on("exit", resolve);
            spawnedProcess.on("error", reject);
            spawnedProcess.on("message", (message) => console.log(message))
        })
        

    }

}