import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./erros/org-already-exists.error";
import { hash } from "bcryptjs";

interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    author_name,
    cep,
    city,
    email,
    latitude,
    longitude,
    name,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email);

    if (orgByEmail) throw new OrgAlreadyExistsError();

    const password_hash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      author_name,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password: password_hash,
      state,
      street,
      whatsapp,
    });

    return {
      org,
    };
  }
}
