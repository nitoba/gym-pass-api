import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { RegisterUserCase } from './register'

const makeSut = () => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new RegisterUserCase(usersRepository)

  return { sut, usersRepository }
}

/* eslint-disable no-undef */
describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const { sut } = makeSut()

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with duplicated email', async () => {
    const { sut } = makeSut()

    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const result = sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result).rejects.toThrowError(new UserAlreadyExistsError())
  })

  it('should be able to register a new user', async () => {
    const { sut } = makeSut()

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
  })
})
