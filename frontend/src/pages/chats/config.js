import { message } from "antd";
import setting from "../../configs/setting";
import { apiGetAuth } from "../../services/api/auth";

const config = {
    // URL
    GET_LIST: `${setting.API_URL}rooms`,

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
};

export default config;
