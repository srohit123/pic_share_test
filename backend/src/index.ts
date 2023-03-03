import './config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import initRoutes from './routes'

import { AppDataSource } from './data-source'
import { insertDummyTestData } from './utils/methodHelper'

const app = express()
const PORT = process.env.APP_PORT
  
const startServer = () => {
  app.listen(PORT , () => {
    console.log(`App starting at PORT ${PORT}`)
  })
}

const setupGlobalMiddlewares = () => {
  // Enable logger (morgan)
  app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'))

  // Request body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Add cors
  app.use(cors())
}

const startDatabase = async () => {
  try {
    await AppDataSource.initialize()
  } catch(error) {
    console.log('Error while connecting the database', error)
    process.exit(0)
  }
}

const runMigrations = async () => {
  console.log('"Running migrations...')
  return AppDataSource.runMigrations()
}

const insertTestData = async () => {
  console.log('Inserting Dummy Test Data...')
  return insertDummyTestData()
}

const startApp = async () => {
  // Start Database
  await startDatabase()

  // Run migrations
  await runMigrations()

  // Insert Test Data
  await insertTestData()

  // Start Server
  startServer()

  // Setup Global middleware
  setupGlobalMiddlewares()

  // Initialize routes
  initRoutes(app)
}

startApp()
