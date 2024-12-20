import { Org, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
    latitude: number
    longitude: number
  }
  

export interface OrgsRepository {
    findById(id: string): Promise<Org | null>
    create(data: Prisma.OrgCreateInput): Promise<Org>
    findManyNearby(params: FindManyNearbyParams): Promise<Org[]>
    findByEmail(email: string): Promise<Org | null>
}