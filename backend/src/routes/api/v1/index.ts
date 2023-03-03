import express from 'express'
import { userRouter } from './user.router'
import { imageRouter } from './image.router'
import { favouriteImageRouter } from './favourite.router'

const router = express.Router()
const NAMESPACE = 'v1'

router.use(`/${NAMESPACE}/user`, userRouter)
router.use(`/${NAMESPACE}/images`, imageRouter)
router.use(`/${NAMESPACE}/favourite_images`, favouriteImageRouter)

export default router