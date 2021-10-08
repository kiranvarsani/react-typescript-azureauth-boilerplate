export interface BaseRecord<T> extends Record<string, unknown> {
  id: T;
}

export interface BaseAuditRecord<T> extends BaseRecord<T> {
  dateCreatedUtc: Date;
  createdById: number;
  createdBy?: ApiUser;
  dateUpdatedUtc: Date;
  updatedById: number;
  updatedBy?: ApiUser;
}

export interface ApiUser extends BaseAuditRecord<number> {
  firstName: string;
  lastName: string;
  email?: string;
  userRoles?: string[];
}

export default interface IApiPagedResult<T> {
  data: T[],
  meta: IApiMetaData,
}

export interface IApiMetaData {
  total: number;
  available: number;
  total_pages: number;
  current_page: number
  skip: number;
  take: number;
};