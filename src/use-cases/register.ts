/* eslint-disable no-useless-constructor */
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

export type RegisterUseCaseInput = {
  email: string
  name: string
  password: string
}

export type RegisterUseCaseResponse = {
  user: User
}

export class RegisterUserCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
