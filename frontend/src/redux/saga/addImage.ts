import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { ADD_IMAGE } from "../../utils/actionConstants";
import { getSubtitle } from "../../utils/getSubtitle";
import { FAVOURITES, IMAGES } from "../../utils/routesConstants";
import apiClient from "../../utils/apiClients";
import { getAuthHeader, getItem } from "../../utils/helpers";

import { addImage as addNewImage } from "../slices/imageSlice";
interface Payload {
  type: string;
  payload: {
    url: string;
    title: string;
    pathname: string;
  };
}

interface Response {
  created_date: string;
  id: string;
  title: string;
  updated_date: string;
  url: string;
  user: {
    id: string;
  };
}

const addImage = async (payload: Payload) => {
  const username = getItem("username");
  const {
    payload: { url, title },
  } = payload;
  try {
    const { data } = await apiClient.post<Response>(
      IMAGES,
      { url, title },
      getAuthHeader()
    );
    if (data) {
      return {
        created_date: data.created_date,
        id: data.id,
        user: { username },
        favouriteImage: [],
        title: data.title,
        url: data.url,
      };
    }
  } catch (error: any) {
    throw error;
  }
};

function* addImageWorker(payload: Payload): any {
  try {
    const image = yield call(addImage, payload);
    const subtitle = getSubtitle(image.title);
    if (!(payload.payload.pathname === FAVOURITES)) {
      yield put(addNewImage({ image }));
    }
    toast.success(`Image ${subtitle} has been successfully added.`);
  } catch (error) {
    toast.error(
      "Unable to process your request at the moment, please try again."
    );
  }
}

function* addImageWatcher() {
  yield takeLatest(ADD_IMAGE, addImageWorker);
}

export default function* addImagesSaga() {
  yield all([call(addImageWatcher)]);
}
