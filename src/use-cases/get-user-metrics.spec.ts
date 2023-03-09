/* eslint-disable no-undef */
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUserCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUserCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUserCase(checkInsRepository)
  })

  it('should be able to get user metrics of user', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-id',
      })
    }

    const { checkInsCount } = await sut.execute({ userId: 'user-id' })

    expect(checkInsCount).toEqual(22)
  })
})
