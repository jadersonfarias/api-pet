import request from 'supertest'

import { app } from '@/app'
import { makePet } from '../../../../test/factories/make-pet.factory'
import { makeOrg } from '../../../../test/factories/make-org.factory'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const getPetResponse = await request(app.server)
      .get(`/orgs/pets/${response.body.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getPetResponse.status).toBe(200)
  })
})