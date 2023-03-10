import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkInExists.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkInExists.validated_at = new Date()

    await this.checkInsRepository.save(checkInExists)

    return {
      checkIn: checkInExists,
    }
  }
}
