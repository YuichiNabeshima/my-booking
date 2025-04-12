import { injectable } from "inversify";
import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import type { BusinessTagRepositoryDTO } from "~/.server/repositories/dtos/BusinessTagRepositoryDTO";
import type { BusinessPictureRepositoryDTO } from "~/.server/repositories/dtos/BusinessPictureRepositoryDTO";
import type { FetchBusinessesArgs } from "~/.server/repositories/types/BusinessRepositoryTypes";
import { CUISINE_KIND } from "~/constants/enums/CUISINE_KIND";
import { NEIGHBORHOOD } from "~/constants/enums/NEIGHBORHOOD";

@injectable()
export class BusinessRepositoryMock extends BaseRepository<{ TModel: Partial<BusinessRepositoryDTO> }> implements Partial<IBusinessRepository<Partial<BusinessRepositoryDTO>>> {
  async fetchBusinesses(args: FetchBusinessesArgs) {
    if (args.cuisine?.includes(CUISINE_KIND.ASIAN)) {
      return [
        {
          id: 1,
          name: "Sushi Master",
          cuisine_kind: CUISINE_KIND.ASIAN,
          price_level: 3,
          neighborhood: NEIGHBORHOOD.DOWNTOWN,
          description: "Authentic Japanese sushi restaurant with fresh ingredients",
          business_tag: [
            { id: 1, business_id: 1, name: "Sushi" },
            { id: 2, business_id: 1, name: "Japanese" },
            { id: 3, business_id: 1, name: "Fine Dining" }
          ] as BusinessTagRepositoryDTO[],
          business_picture: [
            { id: 1, business_id: 1, key: "sushi_master_1.jpg", caption: "Main dining area", is_top_slide: true, is_gallery: true },
            { id: 2, business_id: 1, key: "sushi_master_2.jpg", caption: "Sushi counter", is_top_slide: false, is_gallery: true }
          ] as BusinessPictureRepositoryDTO[]
        },
      ] as (Partial<BusinessRepositoryDTO> & {
        business_tag: BusinessTagRepositoryDTO[];
        business_picture: BusinessPictureRepositoryDTO[];
      })[];
    }

    if (args.neighborhood?.includes(NEIGHBORHOOD.YALETOWN)) {
      return [
        {
          id: 2,
          name: "Pasta Paradise",
          cuisine_kind: CUISINE_KIND.ITALIAN,
          price_level: 2,
          neighborhood: NEIGHBORHOOD.YALETOWN,
          description: "Italian restaurant serving homemade pasta and wine",
          business_tag: [
            { id: 4, business_id: 2, name: "Italian" },
            { id: 5, business_id: 2, name: "Pasta" },
            { id: 6, business_id: 2, name: "Wine" }
          ] as BusinessTagRepositoryDTO[],
          business_picture: [
            { id: 3, business_id: 2, key: "pasta_paradise_1.jpg", caption: "Main dining area", is_top_slide: true, is_gallery: true },
            { id: 4, business_id: 2, key: "pasta_paradise_2.jpg", caption: "Wine cellar", is_top_slide: false, is_gallery: true }
          ] as BusinessPictureRepositoryDTO[]
        }
      ];
    }

    if (args.price_level === 3) {
      return [
        {
          id: 1,
          name: "Sushi Master",
          cuisine_kind: CUISINE_KIND.ASIAN,
          price_level: 3,
          neighborhood: NEIGHBORHOOD.DOWNTOWN,
          description: "Authentic Japanese sushi restaurant with fresh ingredients",
          business_tag: [
            { id: 1, business_id: 1, name: "Sushi" },
            { id: 2, business_id: 1, name: "Japanese" },
            { id: 3, business_id: 1, name: "Fine Dining" }
          ] as BusinessTagRepositoryDTO[],
          business_picture: [
            { id: 1, business_id: 1, key: "sushi_master_1.jpg", caption: "Main dining area", is_top_slide: true, is_gallery: true },
            { id: 2, business_id: 1, key: "sushi_master_2.jpg", caption: "Sushi counter", is_top_slide: false, is_gallery: true }
          ] as BusinessPictureRepositoryDTO[]
        },
      ];
    }

    if (args.cuisine?.length && args.neighborhood?.length && args.price_level) {
      return [];
    }

    return [
      {
        id: 1,
        name: "Sushi Master",
        cuisine_kind: CUISINE_KIND.ASIAN,
        price_level: 3,
        neighborhood: NEIGHBORHOOD.DOWNTOWN,
        description: "Authentic Japanese sushi restaurant with fresh ingredients",
        business_tag: [
          { id: 1, business_id: 1, name: "Sushi" },
          { id: 2, business_id: 1, name: "Japanese" },
          { id: 3, business_id: 1, name: "Fine Dining" }
        ] as BusinessTagRepositoryDTO[],
        business_picture: [
          { id: 1, business_id: 1, key: "sushi_master_1.jpg", caption: "Main dining area", is_top_slide: true, is_gallery: true },
          { id: 2, business_id: 1, key: "sushi_master_2.jpg", caption: "Sushi counter", is_top_slide: false, is_gallery: true }
        ] as BusinessPictureRepositoryDTO[]
      },
      {
        id: 2,
        name: "Pasta Paradise",
        cuisine_kind: CUISINE_KIND.ITALIAN,
        price_level: 2,
        neighborhood: NEIGHBORHOOD.YALETOWN,
        description: "Italian restaurant serving homemade pasta and wine",
        business_tag: [
          { id: 4, business_id: 2, name: "Italian" },
          { id: 5, business_id: 2, name: "Pasta" },
          { id: 6, business_id: 2, name: "Wine" }
        ] as BusinessTagRepositoryDTO[],
        business_picture: [
          { id: 3, business_id: 2, key: "pasta_paradise_1.jpg", caption: "Main dining area", is_top_slide: true, is_gallery: true },
          { id: 4, business_id: 2, key: "pasta_paradise_2.jpg", caption: "Wine cellar", is_top_slide: false, is_gallery: true }
        ] as BusinessPictureRepositoryDTO[]
      }
    ] as (Partial<BusinessRepositoryDTO> & {
      business_tag: BusinessTagRepositoryDTO[];
      business_picture: BusinessPictureRepositoryDTO[];
    })[];
  }

  async getTotalCount() {
    return 2;
  }
}