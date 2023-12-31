import { call, put, takeLatest } from "redux-saga/effects";
import {
    getList,
    getListFulfilled,
    getListRejected,
    createMessage,
    createMessageFulfilled,
    createMessageRejected,
    updateMessage,
    updateMessageFulfilled,
    updateMessageRejected,
    deleteMessage,
    deleteMessageFulfilled,
    deleteMessageRejected,
} from "./slice";
import chatConfig from "../../../pages/chats/config";
import { socket } from "../../socket";
import { createFileRejected } from "../file/slice";

function* getListMessage({ payload }) {
    try {
        const res = yield call(chatConfig.GetMessages, payload);
        if (!res) yield put(getListRejected());
        else yield put(getListFulfilled(res));
    } catch (error) {
        yield put(getListRejected());
    }
}

function* createMessageSaga({ payload }) {
    let { files, images, ...rest } = payload;
    let newPayload = { ...rest, files: [] };
    try {
        const resCreatedMessage = yield call(
            chatConfig.CreateMessage,
            newPayload
        );
        if (!resCreatedMessage) yield put(createMessageRejected());
        else {
            let fileIds = [];
            let resCreatedFile = null;
            if (files && files.length) {
                let dataFiles = files.map((file) => ({
                    messageId: resCreatedMessage.savedMessage._id,
                    name: file.originalname,
                    type: false,
                    size: file.size,
                    url: file.path,
                }));
                resCreatedFile = yield call(chatConfig.CreateFile, dataFiles);
                if (!resCreatedFile) yield put(createFileRejected());
                else
                    fileIds.concat(
                        resCreatedFile.savedFile.map((file) => file._id)
                    );
            }

            let imageIds = [];
            let resCreatedImage = null;
            if (images && images.length) {
                let dataImages = images.map((image) => ({
                    messageId: resCreatedMessage.savedMessage._id,
                    name: image.originalname,
                    type: true,
                    size: image.size,
                    url: image.path,
                }));
                resCreatedImage = yield call(chatConfig.CreateFile, dataImages);
                if (!resCreatedImage) yield put(createFileRejected());
                else
                    imageIds.concat(
                        resCreatedImage.savedFile.map((file) => file._id)
                    );
            }

            let dataMessage = {
                id: resCreatedMessage.savedMessage._id,
                text: resCreatedMessage.savedMessage.text,
                files: [...resCreatedMessage.savedMessage.files, ...fileIds],
                images: [...resCreatedMessage.savedMessage.images, ...imageIds],
            };
            const resUpdatedMesage = yield call(
                chatConfig.UpdateMessage,
                dataMessage
            );
            if (!resUpdatedMesage) yield put(updateMessageRejected());
            else {
                socket.emit("sendMessage", {
                    ...resUpdatedMesage.updatedMessage,
                    files: resCreatedFile?.savedFile
                        ? [
                              ...resCreatedMessage.savedMessage.files,
                              ...resCreatedFile?.savedFile,
                          ]
                        : [...resCreatedMessage.savedMessage.files],
                    images: resCreatedImage?.savedFile
                        ? [
                              ...resCreatedMessage.savedMessage.images,
                              ...resCreatedImage?.savedFile,
                          ]
                        : [...resCreatedMessage.savedMessage.images],
                });

                yield put(
                    createMessageFulfilled({
                        savedMessage: {
                            ...resUpdatedMesage.updatedMessage,
                            files: resCreatedFile?.savedFile
                                ? [
                                      ...resCreatedMessage.savedMessage.files,
                                      ...resCreatedFile?.savedFile,
                                  ]
                                : [...resCreatedMessage.savedMessage.files],
                            images: resCreatedImage?.savedFile
                                ? [
                                      ...resCreatedMessage.savedMessage.images,
                                      ...resCreatedImage?.savedFile,
                                  ]
                                : [...resCreatedMessage.savedMessage.images],
                        },
                    })
                );
            }
        }
    } catch (error) {
        console.log("error::", error.message);
        yield put(createMessageRejected());
    }
}

function* updateMessageSaga({ payload }) {
    try {
        const res = yield call(chatConfig.UpdateMessage, payload);
        if (!res) yield put(updateMessageRejected());
        else yield put(updateMessageFulfilled(res));
    } catch (error) {
        yield put(updateMessageRejected());
    }
}

function* deleteMessageSaga({ payload }) {
    try {
        const res = yield call(chatConfig.DeleteMessage, payload);
        if (!res) yield put(deleteMessageRejected());
        else yield put(deleteMessageFulfilled(res));
    } catch (error) {
        yield put(deleteMessageRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(getList.toString(), getListMessage);
    yield takeLatest(createMessage.toString(), createMessageSaga);
    yield takeLatest(updateMessage.toString(), updateMessageSaga);
    yield takeLatest(deleteMessage.toString(), deleteMessageSaga);
}
