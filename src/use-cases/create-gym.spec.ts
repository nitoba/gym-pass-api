/* eslint-disable no-undef */

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUserCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUserCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUserCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'my gym',
      description: 'A awesome gym',
      phone: '1234556787',
      latitude: -5.048447,
      longitude: -42.816941,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
