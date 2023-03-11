import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  try {
    const validateCheckInParamsSchema = z.object({
      checkInId: z.string().uuid(),
    })

    const { checkInId } = await validateCheckInParamsSchema.parseAsync(
      req.params,
    )

    const validateCheckInUseCase = makeValidateCheckInsUseCase()

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId,
    })

    return res.status(204).send({ checkIn })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    if (error instanceof LateCheckInValidationError) {
      return res.status(409).send({ message: error.message })
    }
  }
}
