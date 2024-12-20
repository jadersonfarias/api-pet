import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { FindAllParams, PetsRepository } from '@/repositories/pets.repository'
import { Pet, Prisma } from '@prisma/client'
import crypto from 'node:crypto'


export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [] 

    constructor(private orgsRepository: InMemoryOrgsRepository) {}

   async findById(id: string): Promise<Pet | null> {
      return this.items.find((item) => item.id === id) ?? null
    }
    async findAll(params: FindAllParams): Promise<Pet[]> {
      const orgsByCity = this.orgsRepository.items.filter(
        (org) => org.city === params.city,
      )

      const pets = this.items
          .filter((item) => orgsByCity.some((org) => org.id === item.org_id)) // pega apenas os id que correspode cidade
          .filter((item) => (params.age ? item.age === params.age : true)) // se tiver idade faz o filtro se não pega todos se levar enconta a idade
          .filter((item) => (params.size ? item.size === params.size : true)) // mesma coisa

          .filter((item) =>
            params.energy_level ? item.energy_level === params.energy_level : true,
          )
          .filter((item) =>
            params.environment ? item.environment === params.environment : true,
          )
          
          return pets
    }
    
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
      const pet = {
        id: crypto.randomUUID(),
        ...data,
      }

      this.items.push(pet)

      return pet
      
    }
}