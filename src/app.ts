import Fastify from 'fastify'
import { isZodError } from './errors/zodError'
import { appRoutes } from './http/routes'
import { env } from './lib/env'
export const app = Fastify()

app.register(appRoutes)
app.setErrorHandler((error, _, res) => {
  if (isZodError(error)) {
    return res.status(400).send({ errors: error.formErrors.fieldErrors })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: handle with error using monitoring service instead
  }

  res.status(500).send({ message: 'Internal Server Error' })
})
