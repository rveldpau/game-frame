import { OAuthWindow, OAuthWindowProperties } from "./oauthWindow"
import url from "url";
import axios, { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";

type BaseOAuth2FlowProperties<ResponseType extends string, ProfileDetails extends {}={[key:string]: unknown}> = {
    clientId: string,
    clientSecret: string,
    accessTokenUrl: string,
    scope: string,
    redirectUrl: string,
    responseType: ResponseType
}

type OAuth2CodeFlowProperties = BaseOAuth2FlowProperties<"code"> & {
    authorizeUrl: string,
    handleTokenResponse: (response:AxiosResponse) => OAuthAccessToken
}

type OAuth2ClientFlowProperties = BaseOAuth2FlowProperties<"client-credentials"> & {
    getTokenFromResponse: (response:AxiosResponse) => OAuthAccessToken
}

export type OAuth2SupportedFlowProperties = OAuth2CodeFlowProperties | OAuth2ClientFlowProperties;

export type OAuthAccessToken<ExtraDetails extends {}={[key:string]: unknown}> = ExtraDetails & {
    getBearerToken(): Promise<string|undefined>
}

export class OAuth2Client {
    constructor(private readonly windowLauncher:(props:OAuthWindowProperties) => OAuthWindow){}

    async authenticate(props:OAuth2SupportedFlowProperties):Promise<OAuthAccessToken>{
        if(props.responseType === "code"){
            return this.authenticateCodeFlow(props);
        }else if(props.responseType === "client-credentials"){
            return this.authenticateClientCredentialsFlow(props);
        }
        throw new Error(`Unsupported OAuth2 Flow: ${(props as any).responseType}`);
    }

    private async authenticateClientCredentialsFlow(props: OAuth2ClientFlowProperties):Promise<OAuthAccessToken>{
        const state = Buffer.from((Math.random() * 1000000000).toFixed(0)).toString("hex");
        const response = await axios.post(`${props.accessTokenUrl}?client_id=${encodeURIComponent(props.clientId)}&client_secret=${encodeURIComponent(props.clientSecret)}&grant_type=client_credentials&state=${state}`)
        return props.getTokenFromResponse(response);


    }

    private async authenticateCodeFlow(props: OAuth2CodeFlowProperties):Promise<OAuthAccessToken>{
        const oauthWin = this.windowLauncher({
            launchUrl: `${props.authorizeUrl}?scope=${encodeURIComponent(props.scope)}&response_type=code&client_id=${encodeURIComponent(props.clientId)}&redirect_uri=${encodeURIComponent(props.redirectUrl)}`,
            responseUrl: props.redirectUrl
        });
        const {responseUrl} = await oauthWin.launch();
        const {query} = url.parse(responseUrl, true);

        const exchangeOptions = {
            'grant_type': 'authorization_code',
            'client_id': props.clientId,
            'client_secret': props.clientSecret,
            'code': query.code,
            'redirect_uri': props.redirectUrl,
          };
        
          const options = {
            method: 'POST',
            url: props.accessTokenUrl,
            headers: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(exchangeOptions),
          };

        const response = await axios(options);
        return props.handleTokenResponse(response);


    }
}