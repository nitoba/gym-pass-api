/* eslint-disable no-undef */
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // vi.useFakeTimers()
  })

  //   afterEach(() => {
  //     vi.useRealTimers()
  //   })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-id',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].created_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'any-check-in-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
