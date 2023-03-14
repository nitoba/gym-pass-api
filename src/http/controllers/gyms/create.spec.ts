/* eslint-disable no-undef */
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'my gym',
        description: 'A awesome gym',
        phone: '1234556787',
        latitude: -5.048447,
        longitude: -42.816941,
      })

    expect(response.statusCode).toEqual(201)
  })
})
