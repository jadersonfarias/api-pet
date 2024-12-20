import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { OrgNotFoundError } from '@/use-cases/erros/org-not-found.error'

const bodySchema = z.object({
    name: z.string(),
    age: z.string(),
    about: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
  
  })

  export async function createPetController(
    request: FastifyRequest,
    reply: FastifyReply,
  ){
    const body = bodySchema.parse(request.body)

    const createPetUseCase = makeCreatePetUseCase()

    const org_id = request.user.sub

    try {
      const { pet } = await createPetUseCase.execute({ ...body, org_id })
    
      return reply.status(201).send(pet)
      
    }catch (error) {
        if (error instanceof OrgNotFoundError) {
            return reply.status(400).send({ message: error.message })
        }
    }
  }