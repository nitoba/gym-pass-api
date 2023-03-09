import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

type GetUserProfileUseCaseRequest = {
  userId: string
}

type GetUserProfileUseCaseResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFoundError(`User with id: ${userId}`)

    return {
      user,
    }
  }
}
