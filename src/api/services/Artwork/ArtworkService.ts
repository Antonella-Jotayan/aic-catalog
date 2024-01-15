import {api} from '@app/api/instances/api';
import {
  AxiosBaseApi,
  AxiosBaseApiPaginated,
} from '@app/api/models/BaseApi/BaseApi';
import {normalizeRoute} from '@app/utils/normalizeRoute';

const RESOURCES = {
  GET_ARTWORKS:
    '/artworks?limit={limit}&page={page}&fields=id,title,image_id,artist_title,artist_display,date_display,date_end,medium_display,thumbnail',
  GET_ARTWORK: '/artworks/{artworkId}',
};

const getArtworks = async (limit: number, page: number) => {
  const {data} = await api.get<
    void,
    AxiosBaseApiPaginated<FilteredArtworkDTO[]>
  >(normalizeRoute(RESOURCES.GET_ARTWORKS, {limit, page}));

  return data;
};

const getArtwork = async (artworkId: number) => {
  const {data} = await api.get<void, AxiosBaseApi<ArtworkDTO>>(
    normalizeRoute(RESOURCES.GET_ARTWORK, {artworkId}),
  );

  return data?.data;
};

export const ArtworkService = {
  getArtworks,
  getArtwork,
};
