import axios from "axios";
import setting from "../../configs/setting";
import { message } from "antd";

const instance = axios.create({
    baseURL: setting.API_URL,
});

const callApi = (
    url,
    data = null,
    headers = {},
    method = "GET",
    responseType = "json"
) => {
    if (!headers) headers = {};

    headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
    };

    if (data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
    }

    let params = {};
    if (!(method === "PUT" || method === "POST" || method === "PATCH")) {
        params = data;
        data = {};
    }

    return instance({
        method,
        url,
        data,
        params,
        headers,
        responseType,
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            const { DEFAULT, ERR_NETWORK } = setting.MESSAGES;

            console.log(error, "error");

            if (error.response) {
                const { status, message } = error.response;
                if (status === 401) {
                    message.error(message);
                    return error.response;
                }
                if (status === 403) {
                    message.error(message);
                    return error.response;
                }
                if (status <= 504 && status >= 500) {
                    message.error(message);
                    return error.response;
                }
                if (status >= 404 && status < 422) {
                    message.error(message);
                    return error.response;
                }
            } else if (error.request) {
                switch (error.code) {
                    case "ERR_NETWORK":
                        message.error(ERR_NETWORK);
                        break;

                    default:
                        message.error(DEFAULT);
                        break;
                }
            } else {
                message.error(DEFAULT);
            }
        });
};

export const apiGet = async (url, params = null, headers = {}) => {
    return await callApi(url, params, headers, "GET", "json");
};

export const apiPost = async (url, params = null, headers = {}) => {
    return await callApi(url, params, headers, "POST", "json");
};

export const apiPut = async (url, params = null, headers = {}) => {
    return await callApi(url, params, headers, "PUT", "json");
};

export const apiPatch = async (url, params = null, headers = {}) => {
    return await callApi(url, params, headers, "PATCH", "json");
};

export const apiDelete = async (url, params = null, headers = {}) => {
    return await callApi(url, params, headers, "DELETE", "json");
};
