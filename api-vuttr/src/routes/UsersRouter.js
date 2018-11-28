import express from 'express'
import {
  create,
  findAll,
  destroy,
  findById,
  update,
  token
} from '../controllers/UsersController'
const routes = express.Router()

export const routerConfig = passport => {
  routes.get('/users', findAll)
  routes.get('/users/:id', findById)
  routes.post('/users', create)
  routes.put('/users/:id', update)
  routes.delete('/users/:id', destroy)
  routes.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  routes.get('/auth/google/callback', passport.authenticate('google'), token)
}

export default routes
