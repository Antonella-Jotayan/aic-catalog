import {create} from 'zustand';
import {FavoriteStore} from './types';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandStorage} from '../store';

const useFavoritesStore = create<FavoriteStore>()(
  persist(
    set => ({
      favorites: [],
      toggleFavorite: event =>
        set(state => {
          const alreadyExists = state.favorites.some(
            favorite => favorite.id === event.id,
          );

          if (alreadyExists) {
            return {
              favorites: state.favorites.filter(({id}) => id !== event.id),
            };
          }
          return {favorites: [...state.favorites, event]};
        }),
    }),
    {
      name: 'favorites-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export {useFavoritesStore};
