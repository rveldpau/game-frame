import { InstallStep } from "../installDao";
import { InstallStepImpl } from "../Installer";

export const AddGenresFromIGDB: InstallStepImpl = {
    version: "1.0.0",
    name: "Add Genres from IGDB",
    execute: async (context) => {
        const igdbGenres = await context.igdb.listGenres({fields: ["id", "name", "slug"]});
        for(let i = 0; i < igdbGenres.length; i++){
            const currentGenre = igdbGenres[i];
            await context.api.games.addGenre({
                id: currentGenre.slug,
                name: currentGenre.name,
                igdbId: currentGenre.id
            }) 
        }
        return `Added ${igdbGenres.length} genres`;
    }
}