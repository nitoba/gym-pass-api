import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { isZodError } from './errors/zodError'
import { usersRoutes } from './http/controllers/users/routes'
import { env } from './lib/env'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
export const app = Fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.setErrorHandler((error, _, res) => {
  if (isZodError(error)) {
    console.log(error)
    return res.status(400).send({ errors: error.formErrors.fieldErrors })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: handle with error using monitoring service instead
  }

  console.log(error)

  res.status(500).send({ message: 'Internal Server Error' })
})
