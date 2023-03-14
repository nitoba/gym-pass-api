/* eslint-disable no-undef */
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
describe('History CheckIns (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get history of check-ins of user', async () => {
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

    await request(app.server)
      .post(`/check-in/${gym.id}`)
      .send({ latitude: -5.048447, longitude: -42.816941 })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get(`/check-in/history`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(1)
  })
})
