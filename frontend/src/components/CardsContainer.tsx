import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Image } from "../types/types";
import { FETCH_IMAGES } from "../utils/actionConstants";
import { formatDate } from "../utils/formateDate";
import { FAVOURITE_IMAGES, IMAGES, ROOT } from '../utils/routesConstants'
import { getItem } from "../utils/helpers";
import { HOME, FAVOURITES, LOGIN } from "../utils/routesConstants";

import ImageCard from "./ImageCard";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { NoData } from "./NoData"
import { Auth } from "./Login";

import { ImagesState } from "../redux/slices/imageSlice";
import { loginSuccess } from "../redux/slices/authSlice";

import "react-toastify/dist/ReactToastify.css";

interface Images {
  images: ImagesState
}

const CardsContainer: React.FC = () => {
  const { data, isLoading, error, totalDataCount, skip: skipData }
   = useSelector((state: Images) => state.images)
  const { isLogin } = useSelector((state: Auth) => state.auth)
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    const user = getItem("token");
    if (user) {
      dispatch(loginSuccess())
    }
  }, [dispatch])

  useEffect(() => {
    if (pathname === HOME || pathname === ROOT) {
      dispatch({ type: FETCH_IMAGES, payload: { skipData: 0, route: IMAGES } })
    } else if (pathname === FAVOURITES) {
      dispatch({ type: FETCH_IMAGES, payload: { skipData: 0, route: FAVOURITE_IMAGES } })
    }
  }, [dispatch, pathname])

  const loadMoreRef = useRef<IntersectionObserver | null>()
  const lastImageElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    if (loadMoreRef.current) loadMoreRef.current.disconnect()
    loadMoreRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && skipData <= totalDataCount) {
        if (pathname === HOME || pathname === ROOT) {
          dispatch({ type: FETCH_IMAGES, payload: { skipData: skipData + 20, route: IMAGES } })
        } else if (pathname === FAVOURITES) {
          dispatch({ type: FETCH_IMAGES, payload: { skipData: skipData + 20, route: FAVOURITE_IMAGES } })
        }
      }
    }, {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    })
    if (node && skipData <= totalDataCount) loadMoreRef.current.observe(node)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, skipData, totalDataCount])

  if (error) {
    return <>
      <Error message="Something went wrong please try again..." />
    </>
  }

  if (!data.length && !isLoading) {
    return <NoData />
  }

  return (
    <>
      <main className="main-section">
        <div className="container">
          {!isLogin && (
            <div className="alert alert-custom" role="alert">
              <Link
                to={LOGIN}
                className="alert-link">
                Login
              </Link> to start sharing your favourite pictures with others!
            </div>
          )}
          <section className="card-section">
            <div className="row">
              {data.map((image: Image) => {
                const { created_date } = image;
                const formatedDate = formatDate(created_date);
                return (
                  <div className="col-md-3 col-sm-4 col-6" ref={lastImageElementRef} key={image.id}>
                    <ImageCard
                      title={image.title}
                      url={image.url}
                      userName={image.user.username}
                      date={formatedDate}
                      imageId={image.id}
                      isFavourite={image.favouriteImage ? image.favouriteImage.length > 0 : null}
                      favouriteArray={image.favouriteImage || []}
                    />
                  </div>
                )
              })}
            </div>
          </section>
        </div>
        {isLoading && <Loader />}
      </main>
    </>
  )
}

export default CardsContainer;

