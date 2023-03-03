import { Response } from "express"
import { INVALID_PARAMETER, INTERNAL_SERVER_ERROR, BAD_DATA } from './constants'

interface IResponse {
  response: Response;
  errorType ?: String;
  message ?: String;
  data ?: any;
  code ?: number;
}

export const successResponse = ({ response, message, data }: IResponse) => {
  response.status(200).send({
    message: message || "Request has been successfully executed",
    data: data || []
  })
}

export const failureResponse = ({ response, message, code = 400, errorType }: IResponse) => {
  if (errorType === INVALID_PARAMETER) {
    code = 422
  } else if (errorType === INTERNAL_SERVER_ERROR) {
    code = 500
  } else if (errorType === BAD_DATA) {
    code = 400
  }

  response.status(code).send({
    error: true,
    message: message || 'Error occuring while performing this request'
  }) 
}
