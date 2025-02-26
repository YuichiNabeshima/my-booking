import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import type { IBaseRepository } from "./IBaseRepository";

export type PascalToCamelCase<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : T;

type ModelDelegate<
  T,
  WhereInput,
  WhereUniqueInput,
  CreateInput,
  UpdateInput
> = {
  findUnique: (args: { where: WhereUniqueInput }) => Promise<T | null>;
  findMany: (args?: { where: WhereInput }) => Promise<T[]>;
  create: (args: { data: CreateInput }) => Promise<T>;
  update: (args: { where: WhereUniqueInput; data: UpdateInput }) => Promise<T>;
  delete: (args: { where: WhereUniqueInput }) => Promise<T>;
};

@injectable()
export abstract class BaseRepository<
  TModel,
  WhereUniqueInput = unknown,
  WhereInput = unknown,
  CreateInput = unknown,
  UpdateInput = unknown,
  TModelDelegate extends ModelDelegate<TModel, WhereInput, WhereUniqueInput, CreateInput, UpdateInput> = ModelDelegate<TModel, WhereInput, WhereUniqueInput, CreateInput, UpdateInput>
> implements IBaseRepository<TModel, WhereUniqueInput, WhereInput, CreateInput, UpdateInput> {

  constructor(
    protected data: {
      modelName: PascalToCamelCase<Prisma.ModelName>,
      transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, TModelDelegate>>,
    }
  ) {}

  protected getModel() {
    return this.data.transactionManager.getClient()[this.data.modelName];
  }

  async fetch(args: WhereUniqueInput ) {
    const result = await this.getModel().findUnique({ where: args });
    return result;
  }

  async fetchAll(args?: WhereInput ) {
    const result = await this.getModel().findMany(args ? { where: args } : undefined);
    return result;
  }

  async create(args: CreateInput ) {
    const result = await this.getModel().create({ data: args });
    return result;
  }

  async update(args: { where: WhereUniqueInput, data: UpdateInput }) {
    const result = await this.getModel().update(args);
    return result;
  }

  async remove(args: WhereUniqueInput ) {
    const result = await this.getModel().delete({ where: args });
    return result;
  }
}
