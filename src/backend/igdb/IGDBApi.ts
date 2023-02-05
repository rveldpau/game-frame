import { OAuthAccessToken } from "../oauth/oauth";
import axios, { AxiosResponse } from "axios";

export type IGDBGameRecord = {
    name: string,
    genres: string,
    external_games: string[],
    first_release_date: number,
    storyline: string,
    summary: string,
    artworks: string[],
    videos: string[]
}

export type ExtractKeys<TYPE extends {}, FIELDS extends (keyof TYPE)[]> = FIELDS extends (infer FieldKeys)[] ? FieldKeys : never;
export type IGDBApi = {
    findGame<FIELDS extends (keyof IGDBGameRecord)[]>(options:{where:Partial<IGDBGameRecord>, project: FIELDS}): Promise<PickedFieldsResponse<IGDBGameRecord, FIELDS>[]>;
}

type PickedFieldsResponse<TYPE extends {}, FIELDS extends (keyof TYPE)[]> = Pick<TYPE, ExtractKeys<TYPE, FIELDS>>

export class IGDBAPIImpl implements IGDBApi {
    constructor(private readonly getAccessToken: () => Promise<OAuthAccessToken>){}

    private async getCurrentToken():Promise<string> {
        let currentAccessToken = await this.token?.getBearerToken();
        if(currentAccessToken){
            return Promise.resolve(currentAccessToken);
        }
        this.token = await this.getAccessToken();
        return await this.token.getBearerToken();
    }

    private token?: OAuthAccessToken;
    findGame<FIELDS extends (keyof IGDBGameRecord)[]>(options: { where: Partial<IGDBGameRecord>; project: FIELDS; }): Promise<PickedFieldsResponse<IGDBGameRecord, FIELDS>[]> {
        console.log("Finding games where", JSON.stringify(options.where, undefined, 4));
        return this.makeIGDBAPICall({target: "games", fields: options.project, where: options.where});
    }

    private async makeIGDBAPICall<TYPE, FIELDS extends (keyof TYPE)[]>(
        {target, fields, where}:{target:string, fields: FIELDS, where: Partial<TYPE>}
    ): Promise<PickedFieldsResponse<TYPE, FIELDS>[]> {
        console.log("Making call to IGDB", JSON.stringify(where, undefined, 4));
        let currentAccessToken = await this.getCurrentToken();

        const fieldsToRetrieve = "fields " + fields.join(",");
        console.log("WHERE", Object.entries(where));
        // const queryString = "where " + 
        //     Object.entries(where).reduce((queryStr, [key, value], index) => `${queryStr} ${index === 0 ? "" : "&"} ${key} = ("${value}")` ,"")
        const request = `${fieldsToRetrieve}\n;search "${(where as any).name}";\n`;
        console.log(`Requesting ${target}: ${request}`)
        const response = await axios.post(`https://api.igdb.com/v4/${target}`, request, { headers: {
            "Authorization": `Bearer ${currentAccessToken}`,
            "Client-ID": process.env["IGDB_CLIENTID"],
            "Content-Type": "text/plain",
            "Accept": "application/json"
        }})
        console.log("IGDB Response: ", response);
        return response.data;
    }
}