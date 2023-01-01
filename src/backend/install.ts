import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { GamesDAO } from "../games/dataAccess/gamesDao";

export async function install({
    gamesDAO,
    systemsDAO
}: {
    gamesDAO: GamesDAO,
    systemsDAO: SystemsDAO,
}): Promise<void> {
    if ((await systemsDAO.list()).length === 0) {
        console.log("Creating DOS System");
        await systemsDAO.create({
            id: "dos",
            name: "DOS"
        });

    }
    if ((await gamesDAO.list()).length === 0) {
        console.log("Creating Textris Game for DOS");
        await gamesDAO.create({
            id: "test",
            name: "Textris",
            path: "/opt/games/dos/TEXTRIS/TEXTRIS.EXE",
            images: {
                box: "/home/family/.icons/Textris.png"
            },
            systemId: "dos"
        })
    }
}