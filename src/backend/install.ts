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
            id: "textris",
            name: "Textris",
            path: "/opt/games/dos/TEXTRIS/TEXTRIS.EXE",
            images: {
                box: "/home/family/.icons/Textris.png"
            },
            systemId: "dos"
        })
        await gamesDAO.create({
            id: "sim-city",
            name: "Sim City 2000",
            path: "/opt/games/dos/SC2K/SC2K.EXE",
            images: {
                box: "/home/family/.icons/SimCity_2000.png"
            },
            systemId: "dos"
        })
        await gamesDAO.create({
            id: "tim",
            name: "The Incredible Machine",
            path: "/opt/games/dos/TIM/TIM.EXE",
            images: {
                box: "/home/family/.icons/TheIncredibleMachine.png"
            },
            systemId: "dos"
        })
        await gamesDAO.create({
            id: "oregon-trail",
            name: "Oregon Trail",
            path: "/opt/games/dos/OregonTrail/OREGON.EXE",
            images: {
                box: "/home/family/.icons/OregonTrail.png"
            },
            systemId: "dos"
        })
    }
}