import { AppDataSource } from "src/data-source"
import { FavouriteImage } from "src/entities/favourite"
import { Image } from "src/entities/image"
import { User } from "src/entities/user"
import { ServiceResponseReturnType } from "src/types"

import { INTERNAL_SERVER_ERROR, BAD_DATA, INVALID_IMAGE } from '../../utils/constants'

interface IAddFavouriteImageService {
  imageId: string;
  loggedInUserData: User; 
}

class AddFavouriteImageService {
  static async run ({ imageId, loggedInUserData }: IAddFavouriteImageService): ServiceResponseReturnType {
    try {
      const favouriteImageRepository = AppDataSource.getRepository(FavouriteImage)
      const favouriteImage = new FavouriteImage()

      const ImageRepository = AppDataSource.getRepository(Image)

      // Get Image
      const image = await ImageRepository.findOne({ where: { id: imageId }})

      if (!image) {
        return [{ errorType: BAD_DATA, message: INVALID_IMAGE }]  
      }

      favouriteImage.image = image
      favouriteImage.user = loggedInUserData

      const response = await favouriteImageRepository.save(favouriteImage)  

      return [null, { 
        data: {
          favouriteImageId: response['id'],
          imageId
        } 
      }]                        
    } catch(error) {
      console.log('Error while executing the AddFavouriteImageService', error)
      return [{ errorType: INTERNAL_SERVER_ERROR }]
    }
  }
}

export default AddFavouriteImageService
