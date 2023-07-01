import { call, put, takeLatest } from "redux-saga/effects";
import { getList, getListFulfilled, getListRejected } from "./slice";
import chatConfig from "../../../pages/chats/config";

function* getListRoom({ payload }) {
    try {
        const res = yield call(chatConfig.GetList, { payload });
        if (!res) yield put(getListRejected());
        else yield put(getListFulfilled(res));
    } catch (error) {
        yield put(getListRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(getList.toString(), getListRoom);
}
