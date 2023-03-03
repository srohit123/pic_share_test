import express from 'express'
import ImageController from 'src/controllers/image.controller'
import Authenticate from 'src/middlewares/authenticate'

const args = { mergeParams: true }
const imageRouter = express.Router(args)

imageRouter.route('/')
  .get(ImageController.GetImages)

imageRouter.route('/')
  .post(Authenticate, ImageController.AddImage)  

export { imageRouter }
