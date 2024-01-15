import React, {useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {SizeConversion} from '@app/utils/sizeConversions';
import {useGetEvents} from '@app/api/queries/Event/hooks/useGetEvents';
import type {FilteredEventDTO} from '@app/api/models/Event/Event';
import {EventCard} from '@app/components/EventCard/EventCard';
import {LoadingData} from '@app/components/LoadingData/LoadingData';
import {NoData} from '@app/components/NoData/NoData';
import {COLORS} from '@app/theme/colors';
import {useScrollToTop} from '@react-navigation/native';

const LIMIT = 15;
const TOP_SPACE = SizeConversion.pixelSizeVertical(30);
const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(16);

const Events = () => {
  const flatlistRef = useRef<FlatList>(null);
  useScrollToTop(flatlistRef);

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

  const renderItem: ListRenderItem<FilteredEventDTO> = useCallback(({item}) => {
    return <EventCard key={item.id} item={item} isMinimalContent={false} />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator style={styles.listFooterComponent} />;
    }
    return null;
  }, [isFetchingNextPage]);

  if (isLoading) {
    return <LoadingData />;
  }

  if (!isLoading && (isError || !data)) {
    return <NoData text="Unable to show Events" />;
  }

  return (
    <FlatList
      ref={flatlistRef}
      style={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      maxToRenderPerBatch={10}
      windowSize={5}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<ListFooterComponent />}
    />
  );
};

export {Events};

const styles = StyleSheet.create({
  loading: {alignSelf: 'center', flex: 1},
  itemSeparator: {height: SizeConversion.heightPixel(10)},
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
