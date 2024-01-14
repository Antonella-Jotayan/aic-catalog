import {Text} from '@app/components/ui/Text/Text';
import {COLORS} from '@app/theme/colors';
import {SizeConversion} from '@app/utils/sizeConversions';
import {useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Section from './components/Section/Section';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetEvent} from '@app/api/queries/Event/hooks/useGetEvent';
import {RootNavigatorRouteProp} from '@app/navigators/RootNavigator/types';
import FastImage from 'react-native-fast-image';
import {Icon} from '@app/components/ui/Icon/Icon';
import {useFavoritesStore} from '@app/store/FavoritesStore';
import {useShallow} from 'zustand/react/shallow';

const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(30);
const HIT_SLOP = {bottom: 40, left: 40, right: 40, top: 40};
const defaultImage = require('../../assets/images/placeholder-image.png');

const Event = () => {
  const {params} = useRoute<RootNavigatorRouteProp<'Event'>>();

  const {data, isLoading, isError, isFetching} = useGetEvent({
    eventId: params.eventId,
  });

  const {toggleFavorite, favorites} = useFavoritesStore(
    useShallow(state => ({
      toggleFavorite: state.toggleFavorite,
      favorites: state.favorites,
    })),
  );

  console.log('favorites', favorites);

  const alreadyFavourited = useMemo(() => {
    return favorites.some(({id}) => id === data?.id);
  }, [data?.id, favorites]);

  if (!data || isLoading || isFetching) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (isError && !isLoading) {
    return <Text text="ERROR" />;
  }

  const handleFavorite = () => {
    toggleFavorite(data);
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <FastImage
          style={styles.image}
          defaultSource={defaultImage}
          source={{
            uri: data.image_url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          onPress={handleFavorite}
          style={styles.favIcon}
          activeOpacity={0.8}
          hitSlop={HIT_SLOP}>
          <Icon
            name={alreadyFavourited ? 'HeartFilled' : 'HeartOutlined'}
            color={COLORS.error[600]}
          />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <Text text={data.title} style={styles.title} variant="title-l-bold" />
          <View style={styles.calendarBtnContainer}>
            <TouchableOpacity style={styles.calendarBtn}>
              <Icon name="Calendar" />
              <Text text="Add to calendar" style={styles.calendarBtnText} />
            </TouchableOpacity>
          </View>
          <Section title="Description" description={data.short_description} />
          <Section title="Location" description={data.location} />
          <Section
            title="Time"
            description={`${data.start_time} to ${data.end_time} `}
          />
          <Section
            title="Tickets"
            description={data.is_ticketed ? 'Need Ticket' : 'No Ticket Needed'}
          />
          <Section
            title="Modality"
            description={data.is_virtual_event ? 'Virtual' : 'On Site'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {Event};

const styles = StyleSheet.create({
  loading: {alignSelf: 'center', flex: 1},
  contentContainer: {
    paddingHorizontal: HORIZONTAL_SPACE,
  },

  image: {
    height: SizeConversion.heightPixel(200),
  },
  favIcon: {
    backgroundColor: COLORS.white,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 6,
    zIndex: 2,
    right: SizeConversion.heightPixel(8),
    top: SizeConversion.heightPixel(10),
  },
  title: {
    marginTop: SizeConversion.pixelSizeVertical(30),
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.gray[500],
    textAlign: 'center',
  },
  calendarBtnContainer: {width: '50%', alignSelf: 'center'},
  calendarBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray[200],
    borderRadius: 6,
    paddingVertical: SizeConversion.pixelSizeVertical(10),
    paddingHorizontal: SizeConversion.pixelSizeHorizontal(10),
    justifyContent: 'center',
    marginVertical: SizeConversion.pixelSizeHorizontal(10),
  },
  calendarBtnText: {marginLeft: SizeConversion.pixelSizeHorizontal(4)},
  separatorSmall: {
    marginVertical: SizeConversion.pixelSizeVertical(10),
  },
  imageContainer: {
    backgroundColor: COLORS.gray[200],
    paddingVertical: SizeConversion.pixelSizeVertical(20),
  },
});
