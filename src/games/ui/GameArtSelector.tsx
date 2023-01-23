import React from "react";
import { ChangeHandler } from "../../ui/components/inputs/ChangeHandler";
import { useFieldInputs } from "../../ui/utilities/FieldInputs";
import { GameWithArt } from "../game";
import { APIContext } from "../../ui/APIContext";
import { GameDetailLookupResult } from "../detailsLookup/GameDetailLookup";
import { ArtSelector } from "../../ui/components/inputs/ArtSelector";
import { Field } from "../../ui/components/inputs/Field";

import "./GameArtSelector.scss";

export type GameArtSelectorProperties = {
    art?: Partial<GameWithArt["art"]>,
    onChange?: ChangeHandler<Partial<GameWithArt["art"]>>,
    foundDetails?: GameDetailLookupResult[]

}

const artTypes: (keyof GameWithArt["art"])[] = ["box", "cart", "logo", "snapshot", "gameplayVideo"];
const artTypeTitles = {
    "box": "Box", "cart":"Cartridge", "logo":"Logo", "snapshot":"Snapshot", "gameplayVideo":"Gameplay Video"
}

export function GameArtSelector({ art, onChange, foundDetails }: GameArtSelectorProperties) {
    const api = React.useContext(APIContext);
    const fieldInputs = useFieldInputs({ value: art, onChange });

    const collapsedDetails = (foundDetails?? []).reduce((reduced, current) => ({
        ...reduced,
        ...current
    }), {} as GameDetailLookupResult);
    console.log("Collapsed Details", collapsedDetails);

    const items = artTypes.map(type => ({
        type,
        value: art?.[type],
        isVideo: type === "gameplayVideo",
        onChange: fieldInputs.useInputHandlerFor(type, {afterChange: (ev) => {
            console.log("On Change", ev);
        }}), 
        options: foundDetails?.map(dets => dets?.art?.[type]).filter(Boolean)
    }));

    return <div className="game-art-selector">
        { items.map( item => <Field label={artTypeTitles[item.type]}>
            <ArtSelector key={item.type} {...item} dropdownPosition="top" />
            </Field>
        )}
    </div>
}