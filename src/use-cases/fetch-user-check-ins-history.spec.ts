/* eslint-disable no-undef */
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInHistoryUserCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUserCase

describe('Fetch User CheckIns History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryUserCase(checkInsRepository)
  })

  it('should be able to fetch check ins of user', async () => {
    await checkInsRepository.create({ gym_id: 'gym-1', user_id: 'user-id' })
    await checkInsRepository.create({ gym_id: 'gym-2', user_id: 'user-id-1' })
    await checkInsRepository.create({ gym_id: 'gym-2', user_id: 'user-id' })

    const { checkIns } = await sut.execute({ userId: 'user-id' })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1' }),
      expect.objectContaining({ gym_id: 'gym-2' }),
    ])
  })

  it('should be able to fetch paginated check-ins of user', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-id',
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-id', page: 2 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
