import { Request, Response } from "express"
import GetImagesService from "src/services/images/getImages"
import AddImageService from "src/services/images/addImage"
import { getAccessToken, getDecodedToken } from "src/utils/methodHelper"
import { failureResponse } from "src/utils/responseHandler"
import { successResponse } from "src/utils/responseHandler"

class ImageController {
  static async GetImages(request: Request, response: Response) {
    let decodedToken
    if (request.headers.authorization) {
      const token = getAccessToken(request)

      if (token) {
        decodedToken = getDecodedToken(token)
      }    
    }
  
    const [errorObj, successObj] = await GetImagesService.run({ 
      loggedInUserId: decodedToken && decodedToken.userId 
    })
    if (errorObj) {
      failureResponse({ ...errorObj, response })
    } else {
      successResponse({ ...successObj, response})
    }
  }

  static async AddImage(request: Request, response: Response) {
    const [errorObj, successObj] = await AddImageService.run({ 
      loggedInUserId: request.loggedInUserId,
      url: request.body.url,
      title: request.body.title,
    })
    if (errorObj) {
      failureResponse({ ...errorObj, response })
    } else {
      successResponse({ ...successObj, response})
    }
  }
}

export default ImageController