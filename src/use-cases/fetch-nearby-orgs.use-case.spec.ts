import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { FetchNearbyOrgsUseCase } from "@/use-cases/fetch-nearby-orgs.use-case";
import { OrgAlreadyExistsError } from "./erros/org-already-exists.error";
import { makeOrg } from "../../test/factories/make-org.factory";
import { beforeEach, describe, expect, it } from "vitest";

describe("Fetch Nearby Orgs Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchNearbyOrgsUseCase(orgsRepository);
  });

  it("should be able to fetch nearby orgs", async () => {
    const org = await orgsRepository.create(makeOrg());

    const nearbyOrgs = await sut.execute({
        userLatitude: org.latitude.toNumber(),
        userLongitude: org.longitude.toNumber(),
      })
     
      expect(nearbyOrgs.orgs).toEqual([org])
  });
});
