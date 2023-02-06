import React from "react";
import { FileSelector } from "../../ui/components/inputs/FileSelector";
import { ChangeEvent, ChangeHandler } from "../../ui/components/inputs/ChangeHandler";
import { Field } from "../../ui/components/inputs/Field";
import { TextInput } from "../../ui/components/inputs/TextInput";
import { LauncherConfig } from "../../ui/config/launchers/LauncherConfig";
import { useFieldInputs } from "../../ui/utilities/FieldInputs";
import { Game } from "../game";
import { APIContext } from "../../ui/APIContext";
import { GameDetailLookupResult } from "../detailsLookup/GameDetailLookup";
import { NumberInput } from "../../ui/components/inputs/NumberInput";
import { TwoPanel } from "../../ui/components/TwoPanel";
import { Select } from "../../ui/components/inputs/Select";
import { GenreSelect } from "./GenreSelect";
export type GameDetailsInputProperties = {
    details?: Partial<Game["details"]>,
    onChange?: ChangeHandler<Partial<Game["details"]>>,
    foundDetails?: GameDetailLookupResult[]

}
export function GameDetailsInput({ details, onChange, foundDetails }: GameDetailsInputProperties) {
    const api = React.useContext(APIContext);
    const fieldInputs = useFieldInputs({ value: details, onChange });

    const collapsedDetails = (foundDetails?? []).reduce((reduced, current) => ({
        ...reduced,
        ...current
    }), {} as GameDetailLookupResult);
    console.log("Collapsed Details", collapsedDetails);

    const handlePlotChange = fieldInputs.useInputHandlerFor("plot");
    const handleYearChange = fieldInputs.useInputHandlerFor("year");
    const handlePlayersChange = fieldInputs.useInputHandlerFor("maxPlayer");

    return <div className="game-detail-editor">
        <TwoPanel
            left={<>
                <Field label="Genre">
                    <GenreSelect value={details?.genre} onChange={fieldInputs.useInputHandlerFor("genre")} />
                </Field>
                <Field label="Year">
                    <NumberInput value={details?.year || collapsedDetails.details?.year} onChange={handleYearChange} allowDecimal={false} />
                </Field>
                <Field label="Max Players">
                    <NumberInput value={details?.maxPlayer || collapsedDetails.details?.maxPlayer} onChange={handlePlayersChange} allowDecimal={false} />
                </Field>
            </>}
            right={
                <>
                    <Field label="Plot">
                        <TextInput value={details?.plot || collapsedDetails.details?.plot} onChange={handlePlotChange} longText={true} />
                    </Field>
                </>
            } />
    </div>
}