/* eslint-disable no-undef */
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    // await Promise.all([
    //   prisma.user.deleteMany(),
    //   prisma.checkIn.deleteMany(),
    //   prisma.gym.deleteMany(),
    // ])
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const {
      body: { gym },
    } = await request(app.server)
      .post('/gyms')
      .send({
        title: 'my gym',
        description: 'A awesome gym',
        phone: '1234556787',
        latitude: -5.048447,
        longitude: -42.816941,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .post(`/check-in/${gym.id}`)
      .send({ latitude: -5.048447, longitude: -42.816941 })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
