import { AppDataSource } from "src/data-source"
import { Image } from "src/entities/image"
import { User } from "src/entities/user";
import { ServiceResponseReturnType } from "src/types"

import { 
  INTERNAL_SERVER_ERROR, 
  INVALID_FIELD_TITLE, 
  INVALID_FIELD_URL, 
  INVALID_PARAMETER 
} from '../../utils/constants'

interface IAddImageService {
  url: string;
  title: string;
  loggedInUserId: string; 
}

class AddImageService {
  static async run ({ url, title, loggedInUserId }: IAddImageService): ServiceResponseReturnType {
    try {

      if (!url || !url.trim()) {
        return [{
          errorType: INVALID_PARAMETER,
          message: INVALID_FIELD_URL
        }]
      }

      if (!title || !title.trim()) {
        return [{
          errorType: INVALID_PARAMETER,
          message: INVALID_FIELD_TITLE
        }]
      }

      // Add Image
      const imageRepository = AppDataSource.getRepository(Image)
      const image = new Image()
      image.url = url
      image.title = title
      
      const user = new User()
      user.id = loggedInUserId
      image.user = user

      const imageData = await imageRepository.save(image)
                        
      return [null, { data: imageData }]                       
    } catch(error) {
      console.log('Error while executing the AddImageService', error)
      return [{ errorType: INTERNAL_SERVER_ERROR }]
    }
  }
}

export default AddImageService
