import Users from '../models/User'
import moment from 'moment'
import jwt from 'jwt-simple'
import { configAuth } from '../settings/auth'
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

export const create = async (req, res) => {
  const user = await Users.create(req.body)
  return res.json(user)
}

export const update = async (req, res) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  return res.json(user)
}

export const findById = async (req, res) => {
  const user = await Users.findById(req.params.id)
  return res.json(user)
}

export const findAll = async (req, res) => {
  const users = await Users.find({})
  return res.json(users)
}

export const destroy = async (req, res) => {
  await Users.findByIdAndRemove(req.params.id)
  return res.send()
}

export const token = async (req, res) => {
  const { _id } = req.user

  const payload = {
    sub: _id,
    iat: moment().valueOf(),
    exp: moment()
      .add(3600000, 'ms')
      .valueOf()
  }

  const token = jwt.encode(payload, configAuth.jwtkey)
  return res.send({ token })
}

export const authorization = async (req, res, next) => {
  try {
    const token = req.header('Authorization')

    if (token === undefined) {
      return res.status(401).send({
        message: 'Please make sure your request has an Authorization header'
      })
    }

    const payload = jwt.decode(token, configAuth.jwtkey)

    if (payload.exp <= moment().valueOf()) {
      return res.status(408).send({ message: 'Token has expired' })
    }

    const user = await Users.findById(payload.sub)
    if (!user.active) {
      return res.status(401).send({
        message: 'User blocked'
      })
    }

    next()
  } catch (err) {
    console.log(err)
  }
}

export const authenticate = passport => {
  // used to serialize the user for the session

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(
    new GoogleStrategy(
      {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
      },
      (token, refreshToken, profile, done) => {
        process.nextTick(async () => {
          try {
            const user = await Users.findOne({ 'google.id': profile.id })

            if (user) {
              return done(null, user)
            } else {
              let newUser = {
                google: {
                  id: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value
                }
              }

              const save = await Users.create(newUser)
              return done(null, save)
            }
          } catch (err) {
            return done(err)
          }
        })
      }
    )
  )
}
