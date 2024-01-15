import {useGetArtwork} from '@app/api/queries/Artwork/hooks/useGetArtwork';
import {Text} from '@app/components/ui/Text/Text';
import {COLORS} from '@app/theme/colors';
import {SizeConversion} from '@app/utils/sizeConversions';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Section from './components/Section/Section';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {LoadingData} from '@app/components/LoadingData/LoadingData';
import {NoData} from '@app/components/NoData/NoData';
import {RootNavigatorRouteProp} from '@app/navigators/RootNavigator/types';

const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(30);
const defaultImage = require('../../assets/images/placeholder-image.png');

const Artwork = () => {
  const {params} = useRoute<RootNavigatorRouteProp<'Artwork'>>();
  const {data, isError, isLoading, isFetching} = useGetArtwork({
    artworkId: params.artworkId,
  });

  if (isLoading || isFetching) {
    return <LoadingData />;
  }

  if (!isLoading && (isError || !data)) {
    return <NoData text="Unable to show Artwork" />;
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            defaultSource={defaultImage}
            source={{
              uri: `https://www.artic.edu/iiif/2/${data?.image_id}/full/843,/0/default.jpg`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text
            text={`${data?.title} (${data?.date_end})`}
            style={styles.title}
            variant="title-l-bold"
          />
          {data?.artist_display ? (
            <Text
              text={data?.artist_display}
              style={styles.subtitle}
              variant="subtitle-m-regular"
            />
          ) : null}

          {data?.department_title ? (
            <Section title="Department" description={data?.department_title} />
          ) : null}

          {data?.artist_title ? (
            <Section title="Artist" description={data?.artist_title} />
          ) : null}

          {data?.title ? (
            <Section title="Title" description={data?.title} />
          ) : null}

          {data?.place_of_origin ? (
            <Section title="Place" description={data?.place_of_origin} />
          ) : null}

          {data?.date_start && data?.date_end ? (
            <Section
              title="Date"
              description={`${data?.date_start} - ${data?.date_end}`}
            />
          ) : null}

          {data?.department_title ? (
            <Section title="Department" description={data?.department_title} />
          ) : null}

          {data?.medium_display ? (
            <Section
              title="Short Description"
              description={data?.medium_display}
            />
          ) : null}

          {data?.dimensions ? (
            <Section title="Dimensions" description={data?.dimensions} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {Artwork};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: HORIZONTAL_SPACE,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  title: {
    marginTop: SizeConversion.pixelSizeVertical(30),
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.gray[500],
    textAlign: 'center',
  },

  separatorSmall: {
    marginVertical: SizeConversion.pixelSizeVertical(10),
  },
  imageContainer: {
    backgroundColor: COLORS.gray[200],
    paddingVertical: SizeConversion.pixelSizeVertical(20),
  },
});
