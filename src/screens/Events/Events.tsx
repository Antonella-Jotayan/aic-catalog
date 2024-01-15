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
import {EventCard} from '@app/components/EventCard/EventCard';
import {LoadingData} from '@app/components/LoadingData/LoadingData';
import {NoData} from '@app/components/NoData/NoData';
import {COLORS} from '@app/theme/colors';

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
    return <LoadingData />;
  }

  if (!isLoading && (isError || !data)) {
    return <NoData text="Unable to show Events" />;
  }

  return (
    <FlatList
      style={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      maxToRenderPerBatch={10}
      windowSize={5}
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
    backgroundColor: COLORS.white,
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
