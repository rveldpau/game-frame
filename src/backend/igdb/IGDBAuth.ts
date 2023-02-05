import { OAuth2Client, OAuthAccessToken } from "../oauth/oauth"
import { OAuthWindow } from "../oauth/oauthWindow"

export async function authorizeIGDB(): Promise<OAuthAccessToken>{
    return await new OAuth2Client((props) => new OAuthWindow(props)).authenticate({
        responseType: "client-credentials",
        accessTokenUrl: "https://id.twitch.tv/oauth2/token",
        clientId: process.env["IGDB_CLIENTID"],
        clientSecret: process.env["IGDB_CLIENTSECRET"],
        redirectUrl: "http://localhost/igdb_callback",
        scope: "",
        getTokenFromResponse: (response) => {
            console.log("Completed IGDB Auth!")
            return {
                getBearerToken: () => Promise.resolve(response.data.access_token as string),
                profile: {}
            }
        }
    })
}