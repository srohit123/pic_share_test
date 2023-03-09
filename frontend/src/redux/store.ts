import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga/rootSaga";
import { imagesReducer } from "./slices/imageSlice";
import { authReducer } from "./slices/authSlice";

const sagaMiddleware = createSagaMiddleware();
const store: ToolkitStore = configureStore({
  reducer: {
    images: imagesReducer,
    auth: authReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
