import {create} from 'zustand';
import {FavoriteStore} from './types';

const useFavoritesStore = create<FavoriteStore>()(set => ({
  favorites: [],
  toggleFavorite: event =>
    set(state => {
      const alreadyExists = state.favorites.some(
        favorite => favorite.id === event.id,
      );

      console.log('alreadyExists', alreadyExists);

      if (alreadyExists) {
        return {
          favorites: state.favorites.filter(({id}) => id !== event.id),
        };
      }
      return {favorites: [...state.favorites, event]};
    }),
}));

export {useFavoritesStore};
