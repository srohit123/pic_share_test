import { all, call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import { AUTHENTICATE } from "../../utils/actionConstants";
import apiClient from "../../utils/apiClients";
import { setItem } from "../../utils/helpers";

import { loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";

interface Payload {
  type: string;
  username: string;
}
interface Response {
  access_token: string;
}

const authenticateUser = async (username: string) => {
  try {
    const { data } = await apiClient.post<Response>("user/login", {
      username,
    });
    if (data) {
      setItem("token", data.access_token);
      setItem("username", username);
    }
  } catch (error: any) {
    throw Error(error);
  }
};

function* authWorker(payload: Payload): any {
  try {
    yield put(loginRequest());
    yield call(authenticateUser, payload.username);
    yield put(loginSuccess());
    toast.success(`Welcome ${payload.username}`);
  } catch (error) {
    toast.error(
      "Unable to process your request at the moment, please try again."
    );
    yield put(loginFailure(error));
  }
}

function* authWatcher() {
  yield takeEvery(AUTHENTICATE, authWorker);
}

export default function* imagesSaga() {
  yield all([call(authWatcher)]);
}
