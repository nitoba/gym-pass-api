/* eslint-disable no-undef */
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUserCase } from './search-gyms-ts'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUserCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUserCase(gymsRepository)
  })

  it('should be able to list gyms by query', async () => {
    await gymsRepository.create({
      title: 'javascript gym',
      description: 'A awesome gym',
      phone: '1234556787',
      latitude: -5.048447,
      longitude: -42.816941,
    })

    await gymsRepository.create({
      title: 'typescript gym',
      description: 'A awesome gym',
      phone: '1234556787',
      latitude: -5.048447,
      longitude: -42.816941,
    })

    const { gyms } = await sut.execute({ query: 'typescript gym' })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `javascript gym ${i}`,
        description: 'A awesome gym',
        phone: '1234556787',
        latitude: -5.048447,
        longitude: -42.816941,
      })
    }

    const { gyms } = await sut.execute({ query: 'javascript gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'javascript gym 21' }),
      expect.objectContaining({ title: 'javascript gym 22' }),
    ])
  })
})
