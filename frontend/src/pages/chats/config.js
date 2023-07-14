import { message } from "antd";
import setting from "../../configs/setting";
import {
    apiDeleteAuth,
    apiGetAuth,
    apiPostAuth,
} from "../../services/api/auth";

const config = {
    // URL
    GET_LIST: `${setting.API_URL}rooms`,
    CREATE_MESSAGE: `${setting.API_URL}messages`,
    DELETE_MESSAGE: `${setting.API_URL}messages`,
    CREATE_FILE: `${setting.API_URL}files`,
    UPLOAD: `${setting.API_URL}upload`,

    // Action
    GetList: async (payload) => {
        try {
            let res = await apiGetAuth(config.GET_LIST, payload);

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },
    GetMessages: async (payload) => {
        try {
            let res = await apiGetAuth(
                `${config.GET_LIST}/${payload?.roomId}/messages`
            );

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },
    CreateMessage: async (payload) => {
        try {
            let res = await apiPostAuth(config.CREATE_MESSAGE, payload);

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },
    DeleteMessage: async (payload) => {
        try {
            let res = await apiDeleteAuth(
                `${config.DELETE_MESSAGE}/${payload.id}`
            );

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },
    CreateFile: async (payload) => {
        try {
            let res = await apiPostAuth(config.CREATE_FILE, payload);

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },
    UploadFormData: async (type, payload) => {
        try {
            let res = await apiPostAuth(`${config.UPLOAD}/${type}`, payload, {
                "Content-Type": "multipart/form-data",
            });

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },
};

export default config;
