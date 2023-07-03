import { call, put, takeLatest } from "redux-saga/effects";
import {
    getList,
    getListFulfilled,
    getListRejected,
    createMessage,
    createMessageFulfilled,
    createMessageRejected,
} from "./slice";
import chatConfig from "../../../pages/chats/config";

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
    try {
        const res = yield call(chatConfig.CreateMessage, payload);
        if (!res) yield put(createMessageRejected());
        else yield put(createMessageFulfilled(res));
    } catch (error) {
        yield put(createMessageRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(getList.toString(), getListMessage);
    yield takeLatest(createMessage.toString(), createMessageSaga);
}
