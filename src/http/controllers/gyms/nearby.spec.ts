/* eslint-disable no-undef */
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'javascript gym',
        description: 'A awesome gym',
        phone: '1234556787',
        latitude: -5.048447,
        longitude: -42.816941,
      })

    await request(app.server)
      .post('/gyms')
      .send({
        title: 'typescript gym',
        description: 'A awesome gym',
        phone: '1234556787',
        latitude: -5.1415935,
        longitude: -42.7790581,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -5.048447, longitude: -42.816941 })
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    // expect(response.body.gyms).toEqual([
    //   expect.objectContaining({ title: 'my gym' }),
    // ])
  })
})
