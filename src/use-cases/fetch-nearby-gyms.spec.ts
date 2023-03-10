/* eslint-disable no-undef */
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUserCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUserCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUserCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'near gym',
      description: 'A awesome gym',
      phone: '1234556787',
      latitude: -5.048447,
      longitude: -42.816941,
    })

    await gymsRepository.create({
      title: 'far gym',
      description: 'A awesome gym',
      phone: '1234556787',
      latitude: -5.1415935,
      longitude: -42.7790581,
    })

    const { gyms } = await sut.execute({
      userLatitude: -5.048447,
      userLongitude: -42.816941,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})
