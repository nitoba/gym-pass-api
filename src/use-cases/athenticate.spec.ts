import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'

const makeSut = () => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new AuthenticateUseCase(usersRepository)

  return { sut, usersRepository }
}

/* eslint-disable no-undef */
describe('Authenticate Use Case', () => {
  it('should not be able to authenticate with invalid email', async () => {
    const { sut } = makeSut()

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toThrowError(new InvalidCredentialsError())
  })

  it('should not be able to authenticate with invalid password', async () => {
    const { sut, usersRepository } = makeSut()

    const password_hashed = await hash('123456', 6)

    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: password_hashed,
    })

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '1234566575',
      }),
    ).rejects.toThrowError(new InvalidCredentialsError())
  })

  it('should be able authenticate', async () => {
    const { sut, usersRepository } = makeSut()

    const password_hashed = await hash('123456', 6)

    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: password_hashed,
    })

    const { user } = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.id).toBeTruthy()
  })
})
