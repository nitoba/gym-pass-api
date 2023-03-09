import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'

const makeSut = () => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new GetUserProfileUseCase(usersRepository)

  return { sut, usersRepository }
}

/* eslint-disable no-undef */
describe('Get User Profile Use Case', () => {
  it('should be able to get user profile', async () => {
    const { sut, usersRepository } = makeSut()

    await usersRepository.users.push({
      email: 'any',
      name: 'any',
      password_hash: 'any',
      id: 'user-id',
      created_at: new Date(),
    })

    const { user } = await sut.execute({ userId: 'user-id' })

    expect(user.email).toBe('any')
  })

  it('should not be able to get user profile with wrong user-id', async () => {
    const { sut } = makeSut()

    await expect(() =>
      sut.execute({ userId: 'user-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
