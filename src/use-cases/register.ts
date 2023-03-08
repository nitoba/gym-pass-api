/* eslint-disable no-useless-constructor */
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export type RegisterUseCaseInput = {
  email: string
  name: string
  password: string
}

export class RegisterUserCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(input: RegisterUseCaseInput) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, name, password } = await registerBodySchema.parseAsync(input)

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)

    this.usersRepository.create({ name, email, password_hash })
  }
}
