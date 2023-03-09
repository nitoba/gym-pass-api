/* eslint-disable no-useless-constructor */
import { CheckInsRepository } from '@/repositories/check-ins-repository'

export type GetUserMetricsUseCaseInput = {
  userId: string
}

export type GetUserMetricsUseCaseResponse = {
  checkInsCount: number
}

export class GetUserMetricsUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: GetUserMetricsUseCaseInput): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
