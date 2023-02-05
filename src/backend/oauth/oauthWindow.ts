import { BrowserWindow } from "electron";
import { OAuth2Client, OAuth2SupportedFlowProperties } from "./oauth";

export type OAuthWindowProperties = { 
    launchUrl: string, 
    responseUrl: string
};

export class OAuthWindow {
    private authWindow?:BrowserWindow;
    private handled: boolean = false;
    constructor(private readonly launchProperties: { 
        launchUrl: string, 
        responseUrl: string
    }
    ){}

    launch():Promise<{responseUrl:string}>{
        this.close();
        this.handled = false;
        return new Promise<{responseUrl:string}>((res,rej) => {
            this.authWindow = new BrowserWindow({
                width: 1000,
                height: 600,
                frame: false,
                webPreferences: {
                  nodeIntegration: false
                }
            });
            const {session: {webRequest}} = this.authWindow.webContents;
            webRequest.onBeforeRequest({urls: [this.launchProperties.responseUrl + "*" ]}, async ({url}) => {
                try{
                    res({responseUrl:url});
                } finally {
                    this.handled = true;
                    this.close();
                }
            });
            this.authWindow.loadURL(this.launchProperties.launchUrl);
            this.authWindow.on("closed", () => {
                if(!this.handled){
                    rej("OAuth window closed before authenticated");
                }
            })
        })
        
    }

    close(){
        if(this.authWindow){
            this.authWindow.close();
            this.authWindow = undefined;
        }
    }
}