import {Text} from '@app/components/ui/Text/Text';
import {COLORS} from '@app/theme/colors';
import {SizeConversion} from '@app/utils/sizeConversions';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import Section from './components/Section/Section';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetEvent} from '@app/api/queries/Event/hooks/useGetEvent';
import {RootNavigatorRouteProp} from '@app/navigators/RootNavigator/types';
import FastImage from 'react-native-fast-image';

const HORIZONTAL_SPACE = SizeConversion.pixelSizeHorizontal(30);
const defaultImage = require('../../assets/images/placeholder-image.png');

const Event = () => {
  const {params} = useRoute<RootNavigatorRouteProp<'Event'>>();

  const {data, isLoading, isError, isFetching} = useGetEvent({
    eventId: params.eventId,
  });

  if (isLoading || isFetching) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (isError) {
    return <Text text="ERROR" />;
  }

  if (!data && !isLoading) {
    return <Text text="NO DATA" />;
  }

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
        <View style={styles.contentContainer}>
          <Text text={data.title} style={styles.title} variant="title-l-bold" />
          <Section title="Description" description={data.short_description} />
          <Section title="Location" description={data.location} />
          <Section
            title="Time"
            description={`${data.start_time} to ${data.end_time} `}
          />
          <Section
            title="Tickets"
            description={data.is_ticketed ? 'With Ticket' : 'Without Ticket'}
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
