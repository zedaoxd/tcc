type Paginated<TData> = {
  totalItems: number;
  page: number;
  totalPages: number;
  size: number;
  itens: TData[];
};
