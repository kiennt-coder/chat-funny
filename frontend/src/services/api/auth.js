import { getState } from "../store";
import instance, { apiDelete, apiGet, apiPatch, apiPost, apiPut } from ".";

instance.interceptors.request.use((config) => {
    const { headers } = config;
    if (headers?.Authorization) {
        let { auth } = getState();
        console.log(auth.token);
    }

    return config;
});

const headerConfigs = async (headers = {}) => {
    let { auth } = getState();
    return {
        ...headers,
        Authorization: `Bearer ${auth.token}`,
    };
};

export const apiGetAuth = async (url, params = null, headers = {}) => {
    const _headers = await headerConfigs(headers);
    return apiGet(url, params, _headers);
};

export const apiPostAuth = async (url, params = null, headers = {}) => {
    const _headers = await headerConfigs(headers);
    return apiPost(url, params, _headers);
};

export const apiPutAuth = async (url, params = null, headers = {}) => {
    const _headers = await headerConfigs(headers);
    return apiPut(url, params, _headers);
};

export const apiPatchAuth = async (url, params = null, headers = {}) => {
    const _headers = await headerConfigs(headers);
    return apiPatch(url, params, _headers);
};

export const apiDeleteAuth = async (url, params = null, headers = {}) => {
    const _headers = await headerConfigs(headers);
    return apiDelete(url, params, _headers);
};
