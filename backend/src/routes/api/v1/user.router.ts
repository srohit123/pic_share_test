import express from 'express'
import UserController from 'src/controllers/user.controller'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/login')
  .post(UserController.login)

export { userRouter }
