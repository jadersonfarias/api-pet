import request from 'supertest'

import { app } from '@/app'
import { makePet } from '../../../../test/factories/make-pet.factory'
import { makeOrg } from '../../../../test/factories/make-org.factory'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

      const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())


    expect(response.status).toBe(201)
  })
})