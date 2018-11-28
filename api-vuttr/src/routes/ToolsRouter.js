import express from 'express'
import {
  create,
  findAll,
  destroy,
  findById,
  update
} from '../controllers/ToolsController'
import { authorization } from '../controllers/UsersController'
const routes = express.Router()

routes.get('/tools', authorization, findAll)
routes.get('/tools/:id', authorization, findById)
routes.post('/tools', authorization, create)
routes.put('/tools/:id', authorization, update)
routes.delete('/tools/:id', authorization, destroy)

export default routes
