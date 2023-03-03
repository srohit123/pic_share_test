import express from 'express'
import FavouriteImageController from 'src/controllers/favourite.controller'
import Authenticate from 'src/middlewares/authenticate'

const args = { mergeParams: true }
const favouriteImageRouter = express.Router(args)

favouriteImageRouter.route('/')
  .get(Authenticate, FavouriteImageController.GetFavouriteImages)

favouriteImageRouter.route('/')
  .post(Authenticate, FavouriteImageController.AddFavouriteImage)

favouriteImageRouter.route('/:favourite_image_id')
  .delete(Authenticate, FavouriteImageController.RemoveFavouriteImage)  

export { favouriteImageRouter }
