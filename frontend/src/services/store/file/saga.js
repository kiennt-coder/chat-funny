import { call, put, takeLatest } from "redux-saga/effects";
import {
    getList,
    getListFulfilled,
    getListRejected,
    createFile,
    createFileFulfilled,
    createFileRejected,
} from "./slice";
import chatConfig from "../../../pages/chats/config";

function* getListFile({ payload }) {
    try {
        const res = yield call(chatConfig.GetList, { payload });
        if (!res) yield put(getListRejected());
        else yield put(getListFulfilled(res));
    } catch (error) {
        yield put(getListRejected());
    }
}

function* createFileSaga({ payload }) {
    try {
        const res = yield call(chatConfig.CreateFile, payload);
        if (!res) yield put(createFileRejected());

        yield put(createFileFulfilled(res));
    } catch (error) {
        yield put(createFileRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(getList.toString(), getListFile);
    yield takeLatest(createFile.toString(), createFileSaga);
}
