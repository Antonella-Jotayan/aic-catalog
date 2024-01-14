import {UseQueryOptions} from '@tanstack/react-query';

type WrappedQueryOptions<TData> = Omit<
  UseQueryOptions<TData>,
  'queryKey' | 'queryFn'
>;

export type {WrappedQueryOptions};
