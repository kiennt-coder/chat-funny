import { getState } from "../store";
import instance, { apiDelete, apiGet, apiPatch, apiPost, apiPut } from ".";
import configLogin from "../../pages/login/config";
import { message } from "antd";
import setting from "../../configs/setting";
import { refreshTokenFulfilled } from "../store/auth/slice";

instance.interceptors.request.use(async (config) => {
    const { headers } = config;
    if (headers?.Authorization) {
        try {
            let {
                auth: { accessToken },
            } = getState();
            let currentTime = new Date().getTime();
            let refreshToken = JSON.parse(
                localStorage.getItem(setting.LOCAL_STORAGE.REFRESH_TOKEN)
            );

            if (currentTime > accessToken.expired) {
                let res = await configLogin.RefreshToken({
                    refreshToken: refreshToken.token,
                });

                headers.Authorization = `Bearer ${res.accessToken.token}`;
                localStorage.setItem(
                    setting.LOCAL_STORAGE.ACCESS_TOKEN,
                    JSON.stringify(res.accessToken)
                );
                localStorage.setItem(
                    setting.LOCAL_STORAGE.REFRESH_TOKEN,
                    JSON.stringify(res.refreshToken)
                );
                refreshTokenFulfilled(res);
            }
        } catch (err) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    }

    return config;
});

const headerConfigs = async (headers = {}) => {
    let { auth } = getState();
    return {
        ...headers,
        Authorization: `Bearer ${auth.accessToken.token}`,
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
