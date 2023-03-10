import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/check-in/:gymId', create)
  app.patch(
    '/check-in/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
  app.get('/check-in/history', history)
  app.get('/check-in/metrics', metrics)
}
