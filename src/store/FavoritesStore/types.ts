import {EventDTO} from '@app/api/models/Event/Event';

type FavoriteStore = {
  favorites: EventDTO[];
  toggleFavorite: (newFavorite: EventDTO) => void;
};

export type {FavoriteStore};
