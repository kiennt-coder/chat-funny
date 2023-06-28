import { call, put, takeLatest } from "redux-saga/effects";
import {
    login,
    loginFulfilled,
    loginRejected,
    register,
    registerFulfilled,
    registerRejected,
} from "./slice";
import configLogin from "../../../pages/login/config";
import configRegister from "../../../pages/register/config";

function* loginUser({ payload }) {
    try {
        const res = yield call(configLogin.Login, payload);
        if (!res) yield put(loginRejected());
        else yield put(loginFulfilled(res));
    } catch (error) {
        yield put(loginRejected());
    }
}

function* registerUser({ payload }) {
    try {
        const res = yield call(configRegister.Register, payload);
        if (!res) yield put(registerRejected());
        else yield put(registerFulfilled(res));
    } catch (error) {
        yield put(registerRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(login.toString(), loginUser);
    yield takeLatest(register.toString(), registerUser);
}
