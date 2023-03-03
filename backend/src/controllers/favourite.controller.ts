import { Request, Response } from "express"
import AddFavouriteImageService from "src/services/favouriteImages/addFavouriteImage"
import GetFavouriteImageService from "src/services/favouriteImages/getFavouriteImages"
import RemoveFavouriteImageService from "src/services/favouriteImages/removeFavouriteImage"
import { failureResponse, successResponse } from "src/utils/responseHandler"

class FavouriteImageController {
  static async GetFavouriteImages(request: Request, response: Response) {
    const [ errorObj, successObj ] = await GetFavouriteImageService.run({ 
      loggedInUserId: request.loggedInUserId,
      skip: parseInt(request.query.skip?.toString() || "0"),
      limit: parseInt(request.query.limit?.toString() || "20"), 
    })

    if (errorObj) {
      failureResponse({ ...errorObj, response })
    } else {
      successResponse({ ...successObj, response})
    }
  }

  static async AddFavouriteImage(request: Request, response: Response) {
    const [ errorObj, successObj ] = await AddFavouriteImageService.run({ 
      loggedInUserData: request.loggedInUserData,
      imageId: request.body.imageId
    })

    if (errorObj) {
      failureResponse({ ...errorObj, response })
    } else {
      successResponse({ ...successObj, response})
    }
  }

  static async RemoveFavouriteImage(request: Request, response: Response) {
    const [ errorObj, successObj ] = await RemoveFavouriteImageService.run({ 
      loggedInUserId: request.loggedInUserId,
      favouriteImageId: request.params.favourite_image_id
    })

    if (errorObj) {
      failureResponse({ ...errorObj, response })
    } else {
      successResponse({ ...successObj, response})
    }
  }
}

export default FavouriteImageController