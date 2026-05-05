export type Pagination = {
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
};

export type Api<T> = {
  status: number;
  data: T | null;
  message: string;
};

export type ApiPagination<T> = {
  status: number;
  data: { data: T; pagination: Pagination } | null;
  message: string;
};
