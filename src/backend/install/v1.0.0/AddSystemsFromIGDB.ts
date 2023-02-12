import { InstallStep } from "../installDao";
import { InstallStepImpl } from "../Installer";

export const AddSystemsFromIGDB: InstallStepImpl = {
    version: "1.0.0",
    name: "Add Systems from IGDB",
    execute: async (context) => {
        const igdbPlatforms = await context.igdb.listPlatforms({fields: ["id", "name", "summary", "abbreviation", "platform_logo"]});
        console.log("Found platforms", JSON.stringify(igdbPlatforms,undefined,4));
        const systems = igdbPlatforms.map(currentPlatform => ({
            id: `igdb-${currentPlatform.id}`,
            name: currentPlatform.name,
            abbreviation: currentPlatform.abbreviation,
            summary: currentPlatform.summary,
            defaultLauncher: {
                id: "unknown",
                config: {}
            },
            active: false
        })).filter(system => system?.defaultLauncher?.id);
        console.log("Systems", systems);
        await context.daos.systemsDAO.create(systems);
        return `Added ${igdbPlatforms.length} genres`;
    }
}