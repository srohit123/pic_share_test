import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { DELETE_FAVOURITE_IMAGE } from "../../utils/actionConstants";
import apiClient from "../../utils/apiClients";
import { getAuthHeader } from "../../utils/helpers";
import { FAVOURITE_IMAGES } from "../../utils/routesConstants";

import { unLikeImage } from "../slices/imageSlice";

interface Payload {
  type: string;
  payload: {
    imageId: string;
    favouriteImageId: string;
  };
}

interface Response {
  affected: number;
}

const deleteFavuoriteImage = async (payload: Payload) => {
  const {
    payload: { favouriteImageId },
  } = payload;
  try {
    const { data } = await apiClient.delete<Response>(
      `${FAVOURITE_IMAGES}/${favouriteImageId}`,
      getAuthHeader()
    );
    if (data) {
      return data;
    }
  } catch (error: any) {
    throw Error(error);
  }
};

function* deleteFavouriteImageWorker(payload: Payload) {
  try {
    yield call(deleteFavuoriteImage, payload);
    yield put(unLikeImage(payload.payload));
  } catch (error) {
    toast.error(
      "Unable to process your request at the moment, please try again."
    );
  }
}

function* deleteFavouriteImageWatcher() {
  yield takeLatest(DELETE_FAVOURITE_IMAGE, deleteFavouriteImageWorker);
}

export default function* deleteFavouriteImagesSaga() {
  yield all([call(deleteFavouriteImageWatcher)]);
}
