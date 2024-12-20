import { PetsRepository } from '@/repositories/pets.repository'
import { PetNotFoundError } from '@/use-cases/erros/pet-not-found.error'
import { Pet } from '@prisma/client'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
    constructor(private PetsRepository :PetsRepository ) {}

    async execute({id}: GetPetUseCaseRequest ): Promise<GetPetUseCaseResponse>{
       const pet = await this.PetsRepository.findById(id)

       if(!pet) {
        throw new PetNotFoundError()
       }

       return {
         pet
       }
    }
}
