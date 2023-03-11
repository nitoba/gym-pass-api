/* eslint-disable no-undef */
import { app } from '@/app'
import request from 'supertest'
describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john2@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john2@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({ email: 'john2@example.com' }),
    )
  })
})
