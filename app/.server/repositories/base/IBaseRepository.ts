export interface IBaseRepository<TModel, WhereUniqueInput, WhereInput, CreateInput, UpdateInput> {
  fetch(args: WhereUniqueInput): Promise<TModel | null>;
  fetchAll(args?: WhereInput, take?: number, skip?: number): Promise<TModel[]>;
  create(args: CreateInput | CreateInput[]): Promise<TModel | { count: number }>;
  update(args: { where: WhereUniqueInput; data: UpdateInput }): Promise<TModel>;
  remove(args: WhereUniqueInput): Promise<TModel>;
}
