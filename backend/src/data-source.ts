import "reflect-metadata"

import { DataSource } from "typeorm"
import { User } from "./entities/user"
import { Image } from "./entities/image"
import { FavouriteImage } from "./entities/favourite"

import { initial1677755951256 } from './migrations/1677755951256-initial'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: parseInt(process.env.PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Image, FavouriteImage],
  migrations: [initial1677755951256],
  synchronize: false,
  logging: true,
})
