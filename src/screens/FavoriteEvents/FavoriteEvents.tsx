import {EventDTO} from '@app/api/models/Event/Event';
import {EventCard} from '@app/components/EventCard/EventCard';
import {NoData} from '@app/components/NoData/NoData';
import {useFavoritesStore} from '@app/store/FavoritesStore';
import {SizeConversion} from '@app/utils/sizeConversions';
import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {useShallow} from 'zustand/react/shallow';

const TOP_SPACE = SizeConversion.pixelSizeVertical(30);
const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(16);

const FavoriteEvents = () => {
  const {favorites} = useFavoritesStore(
    useShallow(state => ({
      favorites: state.favorites,
    })),
  );

  const renderItem: ListRenderItem<EventDTO> = useCallback(({item}) => {
    return <EventCard key={item.id} item={item} />;
  }, []);

  if (!favorites.length) {
    return (
      <NoData
        text={`You don't have any favorite event yet.\nTry adding one!`}
      />
    );
  }

  return (
    <FlatList
      style={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      data={favorites}
      renderItem={renderItem}
    />
  );
};

export {FavoriteEvents};

const styles = StyleSheet.create({
  loading: {alignSelf: 'center', flex: 1},
  containerStyle: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: TOP_SPACE,
    paddingHorizontal: HORIZONTAL_SPACE,
    flexGrow: 1,
  },
});
