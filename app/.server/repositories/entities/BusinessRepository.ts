import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/core/transaction/ITransactionManager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { BusinessRepositoryDTO } from "../dtos/BusinessRepositoryDTO";
import type { IBusinessRepository } from "../interfaces/IBusinessRepository";
import type { FetchBusinessesArgs, FilterCondition } from "../types/BusinessRepositoryTypes";
import { BusinessNotFoundError } from "~/.server/core/custom_error/errors/repositories/BusinessNotFoundError";
import type { BusinessInfo } from "~/routes/booking/businessId/index/.server/dtos/LoaderServiceDTO";

@injectable()
export class BusinessRepository extends BaseRepository<
  {
    TModel: BusinessRepositoryDTO;
    WhereUniqueInput: Prisma.BusinessWhereUniqueInput;
    WhereInput: Prisma.BusinessWhereInput;
    CreateManyInput: Prisma.BusinessCreateManyInput;
    UpdateInput: Prisma.BusinessUpdateInput;
    TModelDelegate: Prisma.BusinessDelegate;
  }
> implements IBusinessRepository<BusinessRepositoryDTO> {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BusinessDelegate>>,
  ) {
    super({
      modelName: 'business',
      transactionManager,
    });
  }

  async fetchBusinesses(args: FetchBusinessesArgs) {
    const where = {
      AND: [
        args.cuisine?.filter(Boolean).length ? { cuisine_kind: { in: args.cuisine.filter(Boolean) } } : {},
        args.neighborhood?.filter(Boolean).length ? { neighborhood: { in: args.neighborhood.filter(Boolean) } } : {},
        args.price_level ? { price_level: args.price_level } : {},
      ].filter(condition => Object.keys(condition).length > 0),
    };

    const result = await this.getModel().findMany({
      where,
      take: args?.take,
      skip: args?.skip,
      include: { business_tag: true, business_picture: true }
    });

    return result;
  }

  async getTotalCount(params: FilterCondition): Promise<number> {
    const where = {
      AND: [
        params.cuisine?.filter(Boolean).length ? { cuisine_kind: { in: params.cuisine.filter(Boolean) } } : {},
        params.neighborhood?.filter(Boolean).length ? { neighborhood: { in: params.neighborhood.filter(Boolean) } } : {},
        params.price_level ? { price_level: params.price_level } : {},
      ].filter(condition => Object.keys(condition).length > 0),
    };

    return await this.getModel().count({
      where,
    });
  }

  async fetchInfo({ id }: { id: number }): Promise<BusinessInfo> {
    const result = await this.getModel().findUnique({
      where: { id },
      include: {
        business_tag: true,
        business_hours: true,
      },
    });

    if (!result) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const { id: _, password: __, ...businessInfo } = result;
    return businessInfo;
  }
}
