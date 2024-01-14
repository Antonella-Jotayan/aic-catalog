import type {AxiosResponse} from 'axios';

type InfoDTO = {
  license_text: string;
  license_links: string[];
  version: string;
};

type ConfigDTO = {
  iiif_url: string;
  website_url: string;
};

type PaginationDTO = {
  current_page: number;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
};

type BaseApi<TData> = {
  data: TData;
  info: InfoDTO;
  config: ConfigDTO;
};

type BaseApiWithPagination<TData> = {
  data: TData;
  info: InfoDTO;
  config: ConfigDTO;
  pagination: PaginationDTO;
};

type AxiosBaseApi<TData> = AxiosResponse<BaseApi<TData>>;
type AxiosBaseApiPaginated<TData> = AxiosResponse<BaseApiWithPagination<TData>>;

export type {AxiosBaseApi, AxiosBaseApiPaginated};
