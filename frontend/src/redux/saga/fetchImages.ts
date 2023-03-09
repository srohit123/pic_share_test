import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { FETCH_IMAGES } from "../../utils/actionConstants";
import apiClient from "../../utils/apiClients";
import { getAuthHeader } from "../../utils/helpers";
import { FAVOURITE_IMAGES } from "../../utils/routesConstants";

import {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
} from "../slices/imageSlice";

type Payload = {
  type: string;
  payload: {
    skipData: number;
    route: string;
  };
};

interface FavouriteImage {
  created_date: string;
  id: string;
  updated_date: string;
  image: {
    created_date: string;
    id: string;
    title: string;
    url: string;
    updated_date?: string;
    user: { username: string }
  };
}

interface Data extends FavouriteImage {
  title: string;
  url: string;
  user: {
    username: string;
  };
  favouriteImage?:
    | [
        {
          created_date: string;
          id: string;
          updated_date: string;
        }
      ]
    | [];
}

type Response = [Data[], number];

const fetchImages = async (payload: Payload) => {
  const {
    payload: { skipData, route },
  } = payload;
  try {
    const { data } = await apiClient.get<Response>(
      `${route}?skip=${skipData}`,
      getAuthHeader()
    );
    if (data) {
      if (route === FAVOURITE_IMAGES) {
        const favouriteImages = data[0];
        const formattedFavouriteImages = favouriteImages.map(
          (item: FavouriteImage) => ({
            id: item.image.id,
            title: item.image.title,
            url: item.image.url,
            created_date: item.image.created_date,
            favouriteImage: [
              {
                id: item.id,
                created_date: item.created_date,
                updated_date: item.updated_date,
              },
            ],
            user: {
              username: item.image.user.username,
            },
          })
        );
        return [formattedFavouriteImages, data[1]];
      }
      return data;
    }
  } catch (error: any) {
    throw error;
  }
};

function* fetchImagesWorker(payload: Payload): any {
  const {
    payload: { skipData, route },
  } = payload;
  try {
    yield put(fetchImagesStart());
    const data = yield call(fetchImages, payload);
    yield put(
      fetchImagesSuccess({
        images: data[0],
        dataCount: data[1],
        route,
        skipData,
      })
    );
  } catch (error: any) {
    toast.error("Something went wrong please try again!");
    yield put(fetchImagesFailure(error));
  }
}

function* fetchImagesWatcher() {
  yield takeLatest(FETCH_IMAGES, fetchImagesWorker);
}

export default function* imagesSaga() {
  yield all([call(fetchImagesWatcher)]);
}
