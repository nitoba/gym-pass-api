import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, name, password } = await registerBodySchema.parseAsync(
      req.body,
    )

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ email, name, password })
  } catch (error: any) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ error: error.message })
    }

    throw error
  }
}
