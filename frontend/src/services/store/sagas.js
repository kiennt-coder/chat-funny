import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import roomSaga from "./room/saga";
import messageSaga from "./message/saga";

export default function* rootSaga() {
    yield all([authSaga(), roomSaga(), messageSaga()]);
}
