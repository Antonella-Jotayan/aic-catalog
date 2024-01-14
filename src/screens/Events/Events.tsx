import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import {SizeConversion} from '@app/utils/sizeConversions';
import {useGetEvents} from '@app/api/queries/Event/hooks/useGetEvents';
import type {EventDTO} from '@app/api/models/Event/Event';
import {Text} from '@app/components/ui/Text/Text';
import {EventCard} from '@app/components/EventCard/EventCard';

const LIMIT = 15;
const TOP_SPACE = SizeConversion.pixelSizeVertical(30);
const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(16);

const Events = () => {
  const {data, fetchNextPage, isLoading, isFetchingNextPage, isError} =
    useGetEvents({
      limit: LIMIT,
    });

  const onEndReached = () => {
    if (isLoading || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  const renderItem: ListRenderItem<EventDTO> = useCallback(({item}) => {
    return <EventCard key={item.id} item={item} isMinimalContent={false} />;
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator style={styles.listFooterComponent} />;
    }
  }, [isFetchingNextPage]);

  if (isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (isError) {
    return <Text text="ERROR" />;
  }

  if (!data && !isLoading) {
    return <Text text="NO DATA" />;
  }

  return (
    <FlatList
      style={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export {Events};

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

  listFooterComponent: {
    alignSelf: 'center',
  },
});
