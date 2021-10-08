import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import config from '../config';
import IApiPagedResult from '../types/api.types';
import { acquireAccessToken } from './auth.api';

const apiInstance = axios.create({
    baseURL: config.apiUrl
});

apiInstance.interceptors.request.use(async (axiosRequestConfig: AxiosRequestConfig<any>) => {   
    console.warn("base url", config.apiUrl);
    const res = await acquireAccessToken();    
    if (res) {
        if (axiosRequestConfig.headers && !axiosRequestConfig.headers.Authorization)
        axiosRequestConfig.headers["Authorization"] = "Bearer " + res;
    }

    return axiosRequestConfig;
},
    (error: any) => {
        console.error(error);
        Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response: AxiosResponse): Promise<AxiosResponse> => {
        return Promise.resolve(response);
    },
    (error: AxiosError): Promise<AxiosError> => {
        console.error(error);
        if (error.response?.status === 401) {
            acquireAccessToken();
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export const apiGet = async <T>(url: string): Promise<T> => {
    try {
        const response = await apiInstance.get(url);
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        const data = await response.data;
        return data as T;
    } catch (error) {
        throw error;
    }
};

export const apiSearch = async <T>(url: string): Promise<T[]> => {
    try {
        const response = await apiInstance.get(url);
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }

        const data = await response.data;
        return data as T[];
    } catch (error) {
        throw error;
    }
};

export const apiSearchPaged = async <T>(url: string): Promise<IApiPagedResult<T>> => {
    try {
        const response = await apiInstance.get(url);
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }

        const data = await response.data;
        return data as IApiPagedResult<T>;
    } catch (error) {
        throw error;
    }
};

export const apiPost = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response = await apiInstance.post<T>(url, body);
        if (response.status === 422) {
            return Promise.reject(response);
        }
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiDelete = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response = await apiInstance.delete<T>(url, { data: body });
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiPatch = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response = await apiInstance.patch<T>(url, body);
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};