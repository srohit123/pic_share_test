import { Request } from "express"
import { User } from "src/entities/user"

interface IResponse {
  errorType ?: string;
  message ?: string;
}
  
interface IError extends IResponse {}
  
interface ISuccess extends IResponse {
  data: any;
}

export type ServiceResponseReturnType = Promise<[IError | null, (ISuccess | null)?]>

export interface CustomRequest extends Request {
  loggedInUserId: string;
  loggedInUserData: User;
}

export interface IPayload {
  userId: string;
  username: string;
}
