import { OAuthAccessToken } from "../oauth/oauth";
import axios, { AxiosResponse } from "axios";

type HasId = { id:number};

export type IGDBGameRecord = HasId & {
    name: string,
    genres: string,
    external_games: string[],
    first_release_date: number,
    storyline: string,
    summary: string,
    artworks: string[],
    videos: string[]
}

export type IGDBGenre = HasId & {
    name: string,
    slug: string
}

export type IGDBPlatform = HasId & {
    name: string,
    summary: string,
    abbreviation: string,
    platform_logo: string
}

export type ExtractKeys<TYPE extends {}, FIELDS extends (keyof TYPE)[]> = FIELDS extends (infer FieldKeys)[] ? FieldKeys : never;

export type IGDBApi = {
    findGame<FIELDS extends (keyof IGDBGameRecord)[]>(options:{ search?: string, where?: Partial<IGDBGameRecord>; fields: FIELDS; }): Promise<PickedFieldsResponse<IGDBGameRecord, FIELDS>[]>;
    listGenres<FIELDS extends (keyof IGDBGenre)[]>(options:{ fields: FIELDS; }): Promise<PickedFieldsResponse<IGDBGenre, FIELDS>[]>;
    listPlatforms<FIELDS extends (keyof IGDBPlatform)[]>(options:{ fields: FIELDS; }): Promise<PickedFieldsResponse<IGDBPlatform, FIELDS>[]>;
}

type PickedFieldsResponse<TYPE extends {id:number}, FIELDS extends (keyof TYPE)[]> = Pick<TYPE, ExtractKeys<TYPE, FIELDS> | "id">

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
    findGame<FIELDS extends (keyof IGDBGameRecord)[]>(options: Parameters<IGDBApi["findGame"]>[0]): Promise<PickedFieldsResponse<IGDBGameRecord, FIELDS>[]> {
        console.log("Finding games where", JSON.stringify(options.where, undefined, 4));
        return this.makeIGDBAPICall({target: "games", ...options});
    }

    listGenres<FIELDS extends (keyof IGDBGenre)[]>(options: { fields: FIELDS; }): Promise<PickedFieldsResponse<IGDBGenre, FIELDS>[]> {
        return this.makeIGDBAPICall({target: "genres", limit: 500, ...options});
    }

    listPlatforms<FIELDS extends (keyof IGDBPlatform)[]>(options: { fields: FIELDS; }): Promise<PickedFieldsResponse<IGDBPlatform, FIELDS>[]> {
        return this.makeIGDBAPICall({target: "platforms", limit: 500, ...options});
    }


    private async makeIGDBAPICall<TYPE extends HasId, FIELDS extends (keyof TYPE)[]>(
        {target, fields, where, search, limit}:{target:string, fields: FIELDS, where?: Partial<TYPE>, search?: string, limit?: number}
    ): Promise<PickedFieldsResponse<TYPE, FIELDS>[]> {
        let currentAccessToken = await this.getCurrentToken();

        const fieldsToRetrieve = "fields " + fields.join(",") + ";";
        const searchString = search ? `search "${search.replace(/"/g, '\\"')}";` : ""
        const limitString = limit !==undefined ? `limit ${limit};` : ""
        const whereString = Object.entries(where ?? {}).length ? "where " + 
            Object.entries(where).reduce((queryStr, [key, value], index) => `${queryStr} ${index === 0 ? "" : "&"} ${key} = ("${value}")` ,"") + ";" : "";
        const request = `${fieldsToRetrieve}\n${searchString}\n${whereString}\n${limitString}`.replace(/\n\n/g,"\n").replace(/\n\n/g,"\n").replace(/\n\n/g,"\n");
        console.log(`IGDB API Request ${target}:\n\t${request.replace(/\n/g,"\n\t")}`);
        const response = await axios.post(`https://api.igdb.com/v4/${target}`, request, { headers: {
            "Authorization": `Bearer ${currentAccessToken}`,
            "Client-ID": process.env["IGDB_CLIENTID"],
            "Content-Type": "text/plain",
            "Accept": "application/json"
        }})
        return response.data;
    }
}