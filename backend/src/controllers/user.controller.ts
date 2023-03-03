import { Request, Response } from "express"
import LoginUserService from '../services/users/login'
import { failureResponse } from "src/utils/responseHandler"
import { successResponse } from "src/utils/responseHandler"

class UserController {
  static async login(request: Request, response: Response) {
    const [ errorObj, successObj ] = await LoginUserService.run({ 
      username: request.body.username
    })

    if (errorObj) {
      failureResponse({ ...errorObj, response })
    } else {
      successResponse({ ...successObj, response})
    }
  }
}

export default UserController
