import {ArtworkService} from '@app/api/services/Artwork/ArtworkService';
import {ArtworkKeys} from '../ArtworkKeys';
import {useQuery} from '@tanstack/react-query';
import {WrappedQueryOptions} from '@app/api/models/queryOptions/QueryOptions';

type useGetArtworkProps = {
  artworkId: ArtworkDTO['id'];
  queryOptions?: WrappedQueryOptions<ArtworkDTO>;
};

const useGetArtwork = ({artworkId, ...queryOptions}: useGetArtworkProps) => {
  return useQuery({
    ...queryOptions,
    queryKey: ArtworkKeys.artwork(artworkId),
    queryFn: () => ArtworkService.getArtwork(artworkId),
  });
};

export {useGetArtwork};
