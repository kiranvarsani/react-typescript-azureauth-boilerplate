import { ApiUser } from "../types/api.types";
import _ from "lodash";

export const isInAllRoles = (roles: string[], user?: ApiUser) => {
  if (!user) {
    return false;
  }

  return _.every(roles, (r) => isInRole(r, user));
};

export const isInRole = (role: string, user?: ApiUser) => {
  if (!user) {
    return false;
  }

  return _.some(user.userRoles ?? [], (u) => u === role);
};

export const isInAnyRole = (roles: string[], user?: ApiUser) => {
  if (!user) {
    return false;
  }

  return _.some(roles, (r) => isInRole(r, user));
};
