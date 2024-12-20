import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./erros/invalid-credentials.error";
import { compare } from 'bcryptjs'

interface AuthenticateOrgUseCaseReuest {
  email: string;
  password: string;
}

interface AuthenticateOrgUseCaseResponse {
  org: Org;
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseReuest): Promise<AuthenticateOrgUseCaseResponse>{
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
        throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
        throw new InvalidCredentialsError()
    }

    return {
        org
    }
  }
}
