import React from "react";
import { APIContext, useAPI } from "../../ui/APIContext";
import { ContentLoader } from "../../ui/components/ContentLoader";
import { ChangeHandler } from "../../ui/components/inputs/ChangeHandler";
import { Field } from "../../ui/components/inputs/Field";
import { Select, SelectOption } from "../../ui/components/inputs/Select";
import { GameGenre } from "../dataAccess/genresDao";
import { System } from "../system";

type GenreSelectProps = {
    onChange: ChangeHandler<GameGenre["id"]>
    value?: GameGenre["id"]
}


export function GenreSelect({value, onChange}: GenreSelectProps){
    const api = useAPI();
    return <ContentLoader load={() => api.games.listGenres()} render={results => {
        const options:SelectOption<string>[] =
            results.data.map(genre => ({
                label: genre.name,
                value: genre.id
            }))
        return <Select value={value} options={options} onChange={onChange} />
    }
        
    } />
}