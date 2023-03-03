import { AppDataSource } from "src/data-source"
import { FavouriteImage } from "src/entities/favourite"
import { ServiceResponseReturnType } from "src/types"

import { BAD_DATA, INTERNAL_SERVER_ERROR, INVALID_IMAGE } from '../../utils/constants'

interface IRemoveFavouriteImageService {
  favouriteImageId: string;
  loggedInUserId: string; 
}

class RemoveFavouriteImageService {
  static async run ({ favouriteImageId, loggedInUserId }: IRemoveFavouriteImageService): ServiceResponseReturnType {
    try {
      const favouriteImageRepository = AppDataSource.getRepository(FavouriteImage)

      const favouriteImage = await favouriteImageRepository.findOne({ where: {
        id: favouriteImageId,
        user: {
          id: loggedInUserId
        }
      }})

      if (!favouriteImage) {
        return [{
          errorType: BAD_DATA,
          message: INVALID_IMAGE
        }]
      }
      
      const response = await favouriteImageRepository.delete({
        id: favouriteImageId
      })                         
                        
      return [null, { data: response }]                        
    } catch(error) {
      console.log('Error while executing the RemoveFavouriteImageService', error)
      return [{ errorType: INTERNAL_SERVER_ERROR }, null]
    }
  }
}

export default RemoveFavouriteImageService
