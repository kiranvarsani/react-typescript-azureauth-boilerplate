export interface Config {
    apiUrl: string;
    publicUrl: string;
    version: string;
    releaseDate: string;
    azureClientId: string;
    azureAuthority: string;
    azureLoginScopes: string[];
    azureApiScopes: string[];
    clientUrl: string;
    isDebug: boolean;
  }
  
  const config: Config = {
    apiUrl: process.env.API_URL as string,
    publicUrl: process.env.PUBLIC_URL as string,
    version: process.env.VERSION as string,
    releaseDate: process.env.RELEASE_DATE as string,
    azureClientId: process.env.AZURE_CLIENTID as string,
    azureAuthority: process.env.AZURE_AUTHORITY as string,
    azureLoginScopes: [process.env.AZURE_LOGIN_SCOPES_USER_READ as string],
    azureApiScopes: [
      process.env.AZURE_API_SCOPE_ALL_READ as string      
    ],
    clientUrl: process.env.CLIENT_URL as string,
    isDebug: false,
  };
  
  export default config;
  