import {ArtworkService} from '@app/api/services/Artwork/ArtworkService';
import {ArtworkKeys} from '../ArtworkKeys';
import {useInfiniteQuery} from '@tanstack/react-query';
import {WrappedQueryOptions} from '@app/api/models/queryOptions/QueryOptions';

type useGetArtworksProps = {
  limit: number;
  queryOptions?: WrappedQueryOptions<FilteredArtworkDTO[]>;
};

const useGetArtworks = ({limit, ...queryOptions}: useGetArtworksProps) => {
  return useInfiniteQuery({
    queryKey: ArtworkKeys.artworks,
    queryFn: ({pageParam = 0}) => ArtworkService.getArtworks(limit, pageParam),
    ...queryOptions,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const lastPageLength = lastPage.data.length;

      return lastPageLength < limit
        ? undefined
        : lastPage.pagination.current_page + 1;
    },
    select: data => {
      return data.pages.flatMap(page => page.data) || [];
    },
  });
};

export {useGetArtworks};
