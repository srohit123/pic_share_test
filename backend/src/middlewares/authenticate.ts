import { Response, NextFunction } from "express"
import { INVALID_USER, UNAUTHORIZED } from "src/utils/constants"
import { getAccessToken } from "src/utils/methodHelper"
import { failureResponse } from "src/utils/responseHandler"
import { AppDataSource } from "src/data-source"
import { CustomRequest, IPayload } from "src/types"

import jwt from 'jsonwebtoken'
import { User } from "src/entities/user"

const SECRET_KEY = process.env.JWT_SECRET_KEY as string

const Authenticate = async (request: CustomRequest, response: Response, next: NextFunction) => {
  console.log(request)

  const token = getAccessToken(request)

  if (!token) {
    return failureResponse({
      errorType: UNAUTHORIZED,
      message: INVALID_USER,
      response
    })
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as IPayload
    request.loggedInUserId = decodedToken['userId'] 

    const UserRepository = AppDataSource.getRepository(User)

    // Get User
    const user = await UserRepository.findOne({ 
      where: { id: decodedToken['userId'] 
    }})

    if (!user) {
      throw new Error(INVALID_USER)
    }

    request.loggedInUserData = user
    next()
  } catch(error) {
    return failureResponse({
      errorType: UNAUTHORIZED,
      message: INVALID_USER,
      response
    })
  }
}

export default Authenticate
