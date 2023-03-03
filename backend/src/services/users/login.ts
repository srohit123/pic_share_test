import { AppDataSource } from "src/data-source"
import { User } from "src/entities/user"

import { getJWTToken } from "src/utils/methodHelper"

import { ServiceResponseReturnType } from "src/types"
import { 
  INVALID_PARAMETER, 
  INTERNAL_SERVER_ERROR, 
  INVALID_USERNAME 
} from '../../utils/constants'

interface ILoginUserService {
  username: string;
}

class LoginUserService {
  static async run ({ username }: ILoginUserService): ServiceResponseReturnType {
    try {

      if (!username || !username.trim()) {
        return [{
          errorType: INVALID_PARAMETER,
          message: INVALID_USERNAME
        }]
      }

      username = username.toLowerCase()

      // Get user if exist
      const userRepository = AppDataSource.getRepository(User)

      let userData = await userRepository
                      .createQueryBuilder("user")
                      .where("user.username = :username", { username })
                      .getOne()                   
      
      if (!userData) {
        // Creating new User
        const user = new User()
        user.username = username
        userData = await userRepository.save(user)
      }         
      
      return [null, { 
        data: {
          access_token: getJWTToken({ 
            userId: userData.id, 
            username: userData.username 
          }) 
        }
      }]

    } catch(error) {
      console.log('Error while executing LoginUserService', error)
      return [{ errorType: INTERNAL_SERVER_ERROR }]
    }
  }
}

export default LoginUserService
