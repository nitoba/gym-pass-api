import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const createGymParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { latitude, longitude } = await createCheckInBodySchema.parseAsync(
    req.body,
  )
  const { gymId } = await createGymParamsSchema.parseAsync(req.params)

  const createGym = makeCheckInUseCase()

  await createGym.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(201).send()
}
