import { AppDataSource } from "src/data-source"
import { Image } from "src/entities/image"
import { ServiceResponseReturnType } from "src/types"

import { INTERNAL_SERVER_ERROR } from '../../utils/constants'

interface IGetImagesService {
  loggedInUserId: string | undefined;
  skip: number;
  limit: number;
}

class GetImagesService {
  static async run ({ loggedInUserId, skip, limit }: IGetImagesService): ServiceResponseReturnType {
    try {
      let images = []

      const SELECT_IMAGE_FIELDS = ["image.id", "image.url", "image.title", "image.created_date"]
      if (loggedInUserId) {
        images = await AppDataSource
                        .createQueryBuilder(Image, "image")
                        .select(SELECT_IMAGE_FIELDS)
                        .leftJoin("image.favouriteImage", "favouriteImage", "favouriteImage.userId = :userId", { userId: loggedInUserId })
                        .leftJoin("image.user", "user")
                        .addSelect(["user.username", "favouriteImage"])
                        .limit(limit)
                        .offset(skip)
                        .getMany()
                        
      } else {
        images = await AppDataSource
                        .createQueryBuilder(Image, "image")
                        .select(SELECT_IMAGE_FIELDS)
                        .leftJoin("image.user","user")
                        .addSelect(["user.username"])
                        .limit(limit)
                        .offset(skip)
                        .getMany()
      }
                    
      return [null, { data: images }]                        
    } catch(error) {
      console.log('Error occuring while fetching the images', error)
      return [{ errorType: INTERNAL_SERVER_ERROR }]
    }
  }
}

export default GetImagesService
