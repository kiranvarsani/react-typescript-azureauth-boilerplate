import config from "../config";
import { PublicClientApplication, RedirectRequest, SilentRequest } from "@azure/msal-browser";

let msalInstance: PublicClientApplication | null = null;

export const setMsalInstance = (instance: PublicClientApplication) => {
  msalInstance = instance;
};

export const acquireAccessToken = async () => {
    if (!msalInstance) {
      throw new Error("The msal instance needs to be setup!");
    }
    const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = msalInstance.getAllAccounts();
  
    if (!activeAccount && accounts.length === 0) {
      /*
       * User is not signed in. Throw error or wait for user to login.
       * Do not attempt to log a user in outside of the context of MsalProvider
       */
    }
    const silentRequest: SilentRequest = {
      scopes: config.azureApiScopes,
      account: activeAccount || accounts[0],
    };
    try {
      const authResult = await msalInstance.acquireTokenSilent(silentRequest)
        .catch((error: any) => {
          console.error(error);
          if(error.name === "InteractionRequiredAuthError" || error.name === "BrowserAuthError") {
            localStorage.clear();
      
            const redirectRequest: RedirectRequest = {
              scopes: config.azureApiScopes
            };
      
            msalInstance?.acquireTokenRedirect(redirectRequest);
        }});
      return authResult?.accessToken;
    }
    catch (err: any) {
      console.error(err);
    }
  };