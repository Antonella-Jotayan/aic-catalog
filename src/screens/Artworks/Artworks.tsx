import {useGetArtworks} from '@app/api/queries/Artwork/hooks/useGetArtworks';
import React, {useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {ArtworkItem} from './components';
import {SizeConversion} from '@app/utils/sizeConversions';
import {LoadingData} from '@app/components/LoadingData/LoadingData';
import {NoData} from '@app/components/NoData/NoData';
import {COLORS} from '@app/theme/colors';
import {useScrollToTop} from '@react-navigation/native';

const LIMIT = 16;
const TOP_SPACE = SizeConversion.pixelSizeVertical(30);
const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(16);

const Artworks = () => {
  const flatlistRef = useRef<FlatList>(null);
  useScrollToTop(flatlistRef);

  const {data, fetchNextPage, isLoading, isError, isFetchingNextPage} =
    useGetArtworks({
      limit: LIMIT,
    });

  const renderItem: ListRenderItem<FilteredArtworkDTO> = useCallback(
    ({item}) => {
      return <ArtworkItem key={item.id} item={item} />;
    },
    [],
  );

  const ListFooterComponent = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator style={styles.listFooterComponent} />;
    }
    return null;
  }, [isFetchingNextPage]);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  const onEndReached = () => {
    if (isLoading || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (isLoading) {
    return <LoadingData />;
  }

  if (!isLoading && (isError || !data)) {
    return <NoData text="Unable to show Artworks" />;
  }

  return (
    <FlatList
      ref={flatlistRef}
      style={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      numColumns={2}
      maxToRenderPerBatch={10}
      windowSize={5}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<ListFooterComponent />}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

export {Artworks};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  itemSeparator: {height: SizeConversion.heightPixel(10)},
  contentContainerStyle: {
    paddingTop: TOP_SPACE,
    paddingHorizontal: HORIZONTAL_SPACE,
    flexGrow: 1,
  },
  columnWrapperStyle: {
    gap: 10,
  },
  listFooterComponent: {
    alignSelf: 'center',
  },
});
