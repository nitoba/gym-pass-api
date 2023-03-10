import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

type ValidateCheckInUseCaseRequest = {
  checkInId: string
}

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkInExists = await this.checkInsRepository.findById(checkInId)

    if (!checkInExists) throw new ResourceNotFoundError()

    checkInExists.validated_at = new Date()

    await this.checkInsRepository.save(checkInExists)

    return {
      checkIn: checkInExists,
    }
  }
}
