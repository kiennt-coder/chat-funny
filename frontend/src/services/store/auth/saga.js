import { call, put, takeLatest } from "redux-saga/effects";
import {
    login,
    loginFulfilled,
    loginRejected,
    register,
    registerFulfilled,
    registerRejected,
    logout,
    logoutFulfilled,
    logoutRejected,
    refreshToken,
    refreshTokenFulfilled,
    refreshTokenRejected,
} from "./slice";
import configLogin from "../../../pages/login/config";
import configRegister from "../../../pages/register/config";
import setting from "../../../configs/setting";

const { LOCAL_STORAGE } = setting;

function* loginUser({ payload }) {
    let { remember, user } = payload;
    try {
        const res = yield call(configLogin.Login, user);
        if (!res) yield put(loginRejected());
        else {
            localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(res.user));
            localStorage.setItem(
                LOCAL_STORAGE.ACCESS_TOKEN,
                JSON.stringify(res.accessToken)
            );
            localStorage.setItem(
                LOCAL_STORAGE.REFRESH_TOKEN,
                JSON.stringify(res.refreshToken)
            );
            localStorage.setItem(LOCAL_STORAGE.REMEMBER, remember);
            yield put(
                loginFulfilled({
                    ...res,
                    remember,
                })
            );
        }
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

function* logoutUser() {
    try {
        localStorage.removeItem(LOCAL_STORAGE.USER);
        localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.REMEMBER);

        yield put(logoutFulfilled());
    } catch (error) {
        yield put(logoutRejected());
    }
}

function* refreshTokenUser({ payload }) {
    try {
        const res = yield call(configLogin.RefreshToken, payload);
        if (!res) yield put(refreshTokenRejected());
        else {
            localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, res.accessToken);
            localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, res.refreshToken);
            yield put(refreshTokenFulfilled(res));
        }
    } catch (error) {
        yield put(refreshTokenRejected());
    }
}

export default function* mySaga() {
    yield takeLatest(login.toString(), loginUser);
    yield takeLatest(register.toString(), registerUser);
    yield takeLatest(logout.toString(), logoutUser);
    yield takeLatest(refreshToken.toString(), refreshTokenUser);
}
