import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { isZodError } from '@/errors/zodError'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserCase } from '@/use-cases/register'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    await registerUseCase.execute(req.body as any)
  } catch (error: any) {
    if (isZodError(error)) {
      return res.status(400).send({ errors: error.formErrors.fieldErrors })
    }

    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ error: error.message })
    }

    throw error
  }
}
