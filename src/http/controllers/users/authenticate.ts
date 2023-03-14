import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  try {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = await authenticateBodySchema.parseAsync(
      req.body,
    )

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await res.jwtSign({}, { sign: { sub: user.id } })
    const refreshToken = await res.jwtSign(
      {},
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error: any) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ error: error.message })
    }

    throw error
  }
}
