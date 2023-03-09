import { AppDataSource } from "src/data-source"
import { FavouriteImage } from "src/entities/favourite"
import { ServiceResponseReturnType } from "src/types"
import { INTERNAL_SERVER_ERROR } from '../../utils/constants'

interface IGetFavouriteImageService {
  loggedInUserId: string; 
  skip: number;
  limit: number;
}

class GetFavouriteImageService {
  static async run ({ loggedInUserId, skip, limit}: IGetFavouriteImageService): ServiceResponseReturnType {
    try {

      const imageRepository = AppDataSource.getRepository(FavouriteImage)

      const response = await imageRepository.findAndCount({
        where: {
          user: {
            id: loggedInUserId
          }
        },
        select: {
          image: {
            id: true,
            url: true,
            title: true,
            created_date: true,
            user: { username: true }
          }
        },
        order: {
          created_date: 'DESC'
        },
        relations: {
          image: { user: true },
        },
        skip: skip,
        take: limit
      })
                        
      return [null, { data: response }]                        
    } catch(error) {
      console.log('Error while executing the GetFavouriteImageService', error)
      return [{ errorType: INTERNAL_SERVER_ERROR }, null]
    }
  }
}

export default GetFavouriteImageService
