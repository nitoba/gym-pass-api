/* eslint-disable no-undef */
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
describe('Validate CheckIns (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const user = await prisma.user.findUnique({
      where: { email: 'john@example.com' },
    })
    const gym = await prisma.gym.create({
      data: {
        title: 'my gym',
        description: 'A awesome gym',
        phone: '1234556787',
        latitude: -5.048447,
        longitude: -42.816941,
      },
    })
    const checkIn = await prisma.checkIn.create({
      data: { gym_id: gym.id, user_id: user?.id },
    })
    const response = await request(app.server)
      .patch(`/check-in/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(204)
  })
})
