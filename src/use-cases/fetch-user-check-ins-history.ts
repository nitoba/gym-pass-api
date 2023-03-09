/* eslint-disable no-useless-constructor */
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

export type FetchUserCheckInHistoryUseCaseInput = {
  userId: string
  page?: number
}

export type FetchUserCheckInHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseInput): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page || 1,
    )
    return { checkIns }
  }
}
