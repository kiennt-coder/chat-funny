export default Object.freeze({
    APP_NAME: "Funny Chat",
    API_URL: "https://funny-chat-api-f5dba63047ca.herokuapp.com/v1/",
    SOCKET_URL: "https://funny-chat-api-f5dba63047ca.herokuapp.com",
    AUTHOR: "Kiennt",
    SITE_KEY: "6LfBPtsmAAAAAD1xtkSHLgSGrihge1EJyYPPFLIf",
    SECRET_KEY: "6LfBPtsmAAAAAHC00q-C88756ZM1K2FRRg24J0Vm",

    FILE_TYPES: [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/pdf",
    ],
    IMAGE_TYPES: ["image/png", "image/jpeg", "image/jpg", "image/webp"],

    LOCAL_STORAGE: {
        ACCESS_TOKEN: "ACCESS_TOKEN",
        REFRESH_TOKEN: "REFRESH_TOKEN",
        USER: "USER",
        SETTING: "SETTING",
        REMEMBER: "REMEMBER",
    },

    MESSAGES: {
        DEFAULT: "Lỗi hệ thống!",
        ERR_NETWORK: "Không thể kết nối tới server!",
        ERR_SEND_MESSAGE: "Không thể gửi tin nhắn!",
    },
});
