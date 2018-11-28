import express from 'express'
import passport from 'passport'
import { authenticate } from '../controllers/UsersController'
import '../db'
import cors from 'cors'
import ToolsRouter from '../routes/ToolsRouter'
import UsersRouter, { routerConfig } from '../routes/UsersRouter'
import path from 'path'
import bodyParser from 'body-parser'
const baseUrl = '/'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

authenticate(passport)
app.use(passport.initialize())
routerConfig(passport)

app.use(baseUrl, ToolsRouter)
app.use(baseUrl, UsersRouter)
app.use(express.static(path.join(__dirname, '../../__docs')))

export default app
