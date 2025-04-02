import { Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import type { IBaseRepository } from "./IBaseRepository";

export type PascalToCamelCase<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : T;

type ModelDelegate<
  TOptions extends {
    T: unknown,
    WhereUniqueInput: unknown,
    WhereInput: unknown,
    CreateManyInput: unknown,
    UpdateInput: unknown,
  }
> = {
  findUnique: (args: { where: TOptions['WhereUniqueInput'] }) => Promise<TOptions['T'] | null>;
  findMany: (args?: { where?: TOptions['WhereInput'], take?: number, skip?: number }) => Promise<TOptions['T'][]>;
  createMany: (args: { data: TOptions['CreateManyInput'][] }) => Promise<{count: number}>
  update: (args: { where: TOptions['WhereUniqueInput']; data: TOptions['UpdateInput'] }) => Promise<TOptions['T']>;
  delete: (args: { where: TOptions['WhereUniqueInput'] }) => Promise<TOptions['T']>;
};

@injectable()
export abstract class BaseRepository<
  TOptions extends {
    TModel: unknown,
    WhereUniqueInput?: unknown,
    WhereInput?: unknown,
    CreateManyInput?: unknown,
    UpdateInput?: unknown,
    TModelDelegate?: ModelDelegate<{
      T: TOptions['TModel'];
      WhereUniqueInput: TOptions['WhereUniqueInput'];
      WhereInput: TOptions['WhereInput'];
      CreateManyInput: TOptions['CreateManyInput'];
      UpdateInput: TOptions['UpdateInput'];
    }>,
  },
> implements IBaseRepository<TOptions['TModel'], TOptions['WhereUniqueInput'], TOptions['WhereInput'], TOptions['CreateManyInput'], TOptions['UpdateInput']> {

  constructor(
    protected data: {
      modelName: PascalToCamelCase<Prisma.ModelName>,
      transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>,
        TOptions['TModelDelegate'] extends PrismaClient[keyof PrismaClient]
        ? TOptions['TModelDelegate']
        : ModelDelegate<{
          T: TOptions['TModel'];
          WhereUniqueInput: TOptions['WhereUniqueInput'];
          WhereInput: TOptions['WhereInput'];
          CreateManyInput: TOptions['CreateManyInput'];
          UpdateInput: TOptions['UpdateInput'];
        }>
      >>,
    }
  ) {}

  protected getModel() {
    return this.data.transactionManager.getClient()[this.data.modelName];
  }

  async fetch(args: TOptions['WhereUniqueInput'] ) {
    const result = await this.getModel().findUnique({ where: args });
    return result;
  }

  async fetchAll(args?: TOptions['WhereInput'], take?: number, skip?: number ) {
    const result = await this.getModel().findMany(args ? { where: args, take, skip } : take || skip ? { take, skip } : undefined);
    return result;
  }

  async create(args: TOptions['CreateManyInput'] | TOptions['CreateManyInput'][]) {
    if (Array.isArray(args)) {
      return await this.getModel().createMany({ data: args });
    }
    return await this.getModel().createMany({ data: [args] });
  }

  async update(args: { where: TOptions['WhereUniqueInput'], data: TOptions['UpdateInput'] }) {
    const result = await this.getModel().update(args);
    return result;
  }

  async remove(args: TOptions['WhereUniqueInput'] ) {
    const result = await this.getModel().delete({ where: args });
    return result;
  }
}
