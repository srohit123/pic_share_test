import jwt from 'jsonwebtoken'
import { Request } from 'express'
import { IPayload } from 'src/types'

import { AppDataSource } from 'src/data-source'
import { User } from 'src/entities/user'
import { Image } from 'src/entities/image'

const SECRET_KEY = process.env.JWT_SECRET_KEY as string

export const getJWTToken = (payLoad: IPayload): string => {
  return jwt.sign(payLoad, SECRET_KEY, { expiresIn: '7d' })
}

export const getAccessToken = (req: Request): string | undefined => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  return token
}

export const getDecodedToken = (token: string) => {
  let tokenResponse
  try {
    tokenResponse = jwt.verify(token, SECRET_KEY) as IPayload
  } catch(error) {
    console.log('Error while verifying the token', error)
  }
  return tokenResponse
}

export const insertDummyTestData = async (): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User)

  const users = await userRepository.find()
  if (!users || !users.length) {
    const testUser = new User()
    testUser.username = 'test'
    const testUserData = await userRepository.save(testUser)

    const images = []

    for (let index = 0; index < 50; index++) {
      images.push({
        url: 'https://plus.unsplash.com/premium_photo-1663936756535-6c29f2dc04a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        title: 'Test_' + index + 1,
        user: testUserData
      })
    }

    await AppDataSource
    .createQueryBuilder(Image, "image")
    .insert()
    .values(images)
    .execute()

    console.log('Dummy data has been successfully inserted!')
  }
}
