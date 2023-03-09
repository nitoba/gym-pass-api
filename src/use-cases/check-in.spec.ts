/* eslint-disable no-undef */
import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInUseCase } from './check-in'

let gymsRepository: InMemoryGymsRepository
let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-id',
      latitude: -5.048447,
      longitude: -42.816941,
      title: 'gym',
      description: '',
      phone: '',
    })

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -5.048447,
      userLongitude: -42.816941,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in if gym not exists', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'no-gym',
        userId: 'user-id',
        userLatitude: -5.048447,
        userLongitude: -42.816941,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 1, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -5.048447,
      userLongitude: -42.816941,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -5.048447,
        userLongitude: -42.816941,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 4, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -5.048447,
      userLongitude: -42.816941,
    })

    vi.setSystemTime(new Date(2023, 4, 9, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -5.048447,
      userLongitude: -42.816941,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distance gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-id-01',
      latitude: new Decimal(-5.0328209),
      longitude: new Decimal(-42.8150236),
      title: 'gym',
      description: '',
      phone: '',
    })

    expect(() =>
      sut.execute({
        gymId: 'gym-id-01',
        userId: 'user-id',
        userLatitude: -5.048447,
        userLongitude: -42.816941,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
