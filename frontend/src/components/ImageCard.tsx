import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ADD_FAVOURITE_IMAGE, DELETE_FAVOURITE_IMAGE } from "../utils/actionConstants";
import { FAVOURITES } from "../utils/routesConstants";

import PicModal from "./modals/PicModal";

import { AuthState } from "../redux/slices/authSlice";

interface Props {
  url: string;
  title: string;
  userName: string;
  date: string;
  imageId: string;
  isFavourite: boolean | null;
  favouriteArray: FavouriteImage[] | [];
}
interface FavouriteImage {
  id: string;
  created_date: string;
  updated_date: string;
}
interface Auth {
  auth: AuthState
}

const ImageCard: React.FC<Props> = (props) => {
  const { title, url, userName, date, imageId, isFavourite, favouriteArray } = props;
  const [showModal, setShowModal] = useState(false);
  const { isLogin } = useSelector((state: Auth) => state.auth)
  const dispatch = useDispatch()
  const { pathname } = useLocation()


  const onClickHandler = () => {
    if (isFavourite) {
      dispatch({
        type: DELETE_FAVOURITE_IMAGE,
        payload: {
          imageId,
          favouriteImageId: favouriteArray[0].id,
          isFromFavouritePage: pathname === FAVOURITES
        }
      })
    } else {
      dispatch({ type: ADD_FAVOURITE_IMAGE, imageId })
    }
  }

  return (
    <>
      <div className="card">
        <img 
          onClick={() => setShowModal(true)} src={url}
          className="img-fluid d-block mx-auto  w-100" alt="Card Img" 
          style={{ height: "250px" }} 
        />
        <div className="card-body">
          <h5 className="card-title text-overflow-custom">{title}</h5>
          <div className={`d-flex justify-content-${!isLogin ? "center" : "between"}`}>
            <div className={`d-flex align-items-${!isLogin ? "center" : "start"} flex-column me-1`}>
              <p className="card-text text-overflow-custom">{userName}</p>
              <p className="card-text">{date}</p>
            </div>
            {isLogin && (
              <div className="favorite-icon-box">
                <i 
                  onClick={onClickHandler} 
                  className={`fas fa-heart ${(isFavourite) ? "icon-favorite" : ""}`} 
                  style={{ cursor: "pointer" }}></i>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {
        showModal && (
          <PicModal
            url={url}
            userName={userName}
            date={date}
            closeModal={() => setShowModal(false)}
          />
        )
      }
    </>
  )
}

export default React.memo(ImageCard);