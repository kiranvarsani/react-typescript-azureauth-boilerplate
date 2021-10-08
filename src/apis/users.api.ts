import { apiGet } from "./base.api";
import { ApiUser } from "../types/api.types";

class MeApis {
  public async getMyUserAsync(): Promise<ApiUser> {
    const result = await apiGet<ApiUser>(`/users/me`);    
    return result;
  }
}

const meApi = new MeApis();

export const defaultMeApiInstance = meApi;
