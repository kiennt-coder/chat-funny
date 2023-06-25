const Joi = require("joi");

// Create function validate field in User Schema
const userValidate = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().lowercase().required(),
        password: Joi.string().required(),
        nickname: Joi.string(),
    });

    return userSchema.validate(data);
};

// Create function validate field in room Schema
const roomValidate = (data) => {
    const roomSchema = Joi.object({
        name: Joi.string(),
        avatar: Joi.string(),
        type: Joi.boolean().truthy(1).falsy(0).required(),
        users: Joi.array().unique().items(Joi.string()),
    });

    return roomSchema.validate(data);
};

// Create function validate field in Message Schema
const messageValidate = (data) => {
    const messageSchema = Joi.object({
        roomId: Joi.string(),
        userSendId: Joi.string(),
        userReveiceId: Joi.string(),
        text: Joi.string().required(),
        files: Joi.array().unique().items(Joi.string()),
        isSeen: Joi.array().unique().items(Joi.string()),
    });

    return messageSchema.validate(data);
};

const fileValidate = (data) => {
    const fileSchema = Joi.object({
        name: Joi.string(),
        url: Joi.string().required(),
        messageId: Joi.string(),
    });

    return fileSchema.validate(data);
};

module.exports = {
    userValidate,
    roomValidate,
    messageValidate,
    fileValidate,
};
