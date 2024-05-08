export class PaginatedDto<TData> {
  totalItems: number;

  size: number;

  page: number;

  totalPages: number;

  itens: TData[];

  constructor(paginated: Partial<PaginatedDto<TData>>) {
    Object.assign(this, paginated);
  }
}
