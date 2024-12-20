import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'

import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { PetNotFoundError } from '@/use-cases/erros/pet-not-found.error'

const routeSchema = z.object({
   id: string(),
  })

  export async function  getPetController(
    request: FastifyRequest,
    reply: FastifyReply,
  ){
    const { id } = routeSchema.parse(request.params)

    const getPetUseCase = makeGetPetUseCase()


    try {
      const { pet } = await getPetUseCase.execute({ id })
    
      return reply.status(200).send(pet)
      
    }catch (error) {
        if (error instanceof PetNotFoundError) {
            return reply.status(400).send({ message: error.message })
        }
    }
  }