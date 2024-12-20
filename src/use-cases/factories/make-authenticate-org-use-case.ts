import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new PrismaOrgsRepository())
}