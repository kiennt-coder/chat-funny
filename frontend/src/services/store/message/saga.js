import { call, put, takeLatest } from "redux-saga/effects";
import {
    getList,
    getListFulfilled,
    getListRejected,
    createMessage,
    createMessageFulfilled,
    createMessageRejected,
    deleteMessage,
    deleteMessageFulfilled,
    deleteMessageRejected,
} from "./slice";
import chatConfig from "../../../pages/chats/config";
import { socket } from "../../socket";

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
        const res = yield call(chatConfig.CreateMessage, newPayload);
        if (!res) yield put(createMessageRejected());
        else {
            let [file] = files;
            const resFile = yield call(chatConfig.CreateFile, {
                messageId: res.savedMessage._id,
                name: file.originalname,
                url: file.path,
            });

            if (!resFile) yield put(createMessageRejected());
            else {
                socket.emit("sendMessage", {
                    ...res.savedMessage,
                    files,
                    images,
                });
                yield put(
                    createMessageFulfilled({
                        savedMessage: {
                            ...res.savedMessage,
                            files: [resFile.savedFile],
                        },
                    })
                );
            }
        }
    } catch (error) {
        yield put(createMessageRejected());
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
    yield takeLatest(deleteMessage.toString(), deleteMessageSaga);
}
