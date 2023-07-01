import { message } from "antd";
import setting from "../../configs/setting";
import { apiPost } from "../../services/api";

const config = {
    // URL
    LOGIN: `${setting.API_URL}users/login`,
    REFRESH_TOKEN: `${setting.API_URL}user/refresh-token`,

    // Action
    Login: async (payload) => {
        try {
            let res = await apiPost(config.LOGIN, payload);

            const { status } = res;
            if (status === 200) {
                message.success(res.message);
                return res.data;
            }
        } catch (error) {
            message.error(setting.MESSAGES.DEFAULT);
        }
    },

    RefreshToken: async (payload) => {
        try {
            let res = await apiPost(config.REFRESH_TOKEN, payload);

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
