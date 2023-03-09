import { all, call } from "redux-saga/effects";

import imagesSaga from "./fetchImages";
import authSaga from "./authentication";
import addImagesSaga from "./addImage";
import addFavouriteImagesSaga from "./addFavouriteImage";
import deleteFavouriteImagesSaga from "./deleteFavouriteImage";

export default function* rootSaga() {
  yield all([
    call(imagesSaga),
    call(authSaga),
    call(addImagesSaga),
    call(addFavouriteImagesSaga),
    call(deleteFavouriteImagesSaga),
  ]);
}
