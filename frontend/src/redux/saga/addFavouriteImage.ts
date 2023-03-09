import { all, call, put, takeLatest } from "redux-saga/effects";
import { ADD_FAVOURITE_IMAGE } from "../../utils/actionConstants";
import { toast } from "react-toastify";

import apiClient from "../../utils/apiClients";
import { getAuthHeader } from "../../utils/helpers";
import { FAVOURITE_IMAGES } from "../../utils/routesConstants";

import { likeImage } from "../slices/imageSlice";

interface Payload {
  type: string;
  imageId: string;
}

interface Response {
  favouriteImageId: string;
  imageId: string;
}
const addFavouriteImage = async (payload: Payload) => {
  const { imageId } = payload;
  try {
    const { data } = await apiClient.post<Response>(
      FAVOURITE_IMAGES,
      { imageId },
      getAuthHeader()
    );
    if (data) {
      return data;
    }
  } catch (error: unknown) {
    throw error;
  }
};

function* addFavouriteImageWorker(payload: Payload): any {
  try {
    const data = yield call(addFavouriteImage, payload);
    yield put(likeImage(data));
  } catch (error: any) {
    toast.error("Unable to complete action at the moment, please try again.");
  }
}

function* addFavouriteImageWatcher() {
  yield takeLatest(ADD_FAVOURITE_IMAGE, addFavouriteImageWorker);
}

export default function* addFavouriteImagesSaga() {
  yield all([call(addFavouriteImageWatcher)]);
}
