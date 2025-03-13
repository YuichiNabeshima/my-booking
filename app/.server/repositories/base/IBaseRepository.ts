export interface IBaseRepository<
  TModel,
  WhereUniqueInput,
  WhereInput,
  CreateInput,
  UpdateInput,
> {
  fetch(args: WhereUniqueInput ): Promise<TModel | null>;
  fetchAll(args?: WhereInput ): Promise<TModel[]>;
  create(args: CreateInput ): Promise<TModel>;
  createMany(args: CreateInput[]): Promise<{count: number}>;
  update(args: { where: WhereUniqueInput; data: UpdateInput }): Promise<TModel>;
  remove(args: WhereUniqueInput ): Promise<TModel>;
}
