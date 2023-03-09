import { createSlice, current } from "@reduxjs/toolkit";

import { Image } from "../../types/types";

export interface ImagesState {
  isLoading: boolean;
  data: Image[] | [];
  error: null;
  totalDataCount: number;
  skip: number;
}

const initialState: ImagesState = {
  isLoading: false,
  data: [],
  error: null,
  totalDataCount: 0,
  skip: 0,
};

const {
  actions: {
    fetchImagesSuccess,
    fetchImagesFailure,
    fetchImagesStart,
    likeImage,
    unLikeImage,
    addImage,
  },
  reducer: imagesReducer,
} = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    fetchImagesStart(state) {
      state.isLoading = true;
    },

    fetchImagesSuccess(state, action) {
      state.isLoading = false;
      if (action.payload.skipData) {
        state.data = [...current(state).data, ...action.payload.images];
      } else {
        state.data = action.payload.images;
      }
      state.totalDataCount = action.payload.dataCount;
      state.skip = action.payload.skipData;
    },

    fetchImagesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    likeImage(state, action) {
      state.data = current(state).data.map((item) => {
        if (item.id === action.payload.imageId) {
          return {
            ...item,
            favouriteImage: [
              {
                id: action.payload.favouriteImageId,
                created_date: "",
                updated_date: "",
              },
            ],
          };
        }
        return item;
      });
    },

    unLikeImage(state, action) {
      if (action.payload.isFromFavouritePage) {
        state.data = current(state).data.filter(
          (item) => item.id !== action.payload.imageId
        );
      } else {
        state.data = current(state).data.map((item) => {
          if (item.id === action.payload.imageId) {
            return {
              ...item,
              favouriteImage: [],
            };
          }
          return item;
        });
      }
    },

    addImage(state, action) {
      state.skip = state.skip + 1;
      const { image } = action.payload;
      state.data = [image, ...current(state).data];
    },
  },
});

export {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  likeImage,
  unLikeImage,
  addImage,
  imagesReducer,
};
