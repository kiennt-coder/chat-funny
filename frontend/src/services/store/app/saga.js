import { call, put, takeLatest } from "redux-saga/effects";
import { login, loginFulfilled, loginRejected } from "./slice";
import * as auth from "../../api/auth";

function* loginUser() {
    try {
        const res = yield call(auth.apiGetAuth, { url: "users" });
        if (!res) yield put(loginRejected());
        else yield put(loginFulfilled(res));
    } catch (error) {
        yield put(loginRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(login.toString(), loginUser);
}
