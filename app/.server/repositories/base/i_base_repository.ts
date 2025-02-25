export interface IBaseRepository<
  TModel,
  WhereInput,
  WhereUniqueInput,
  CreateInput,
  UpdateInput
> {
  fetch(args: WhereUniqueInput ): Promise<TModel | null>;
  fetchAll(args?: WhereInput ): Promise<TModel[]>;
  create(args: CreateInput ): Promise<TModel>;
  update(args: { where: WhereUniqueInput; data: UpdateInput }): Promise<TModel>;
  remove(args: WhereUniqueInput ): Promise<TModel>;
}
