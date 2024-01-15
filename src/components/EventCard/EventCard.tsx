import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {SizeConversion} from '@app/utils/sizeConversions';
import {COLORS} from '@app/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {EventDTO} from '@app/api/models/Event/Event';
import {eventCardTextUtil} from '@app/utils/eventCardText';
import {Text} from '../ui/Text/Text';

const defaultImage = require('../../assets/images/placeholder-image.png');

interface EventCardProps {
  item: EventDTO;
  isMinimalContent?: boolean;
}

const EventCard: FC<EventCardProps> = ({item, isMinimalContent = true}) => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('Event', {
      eventId: item.id,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImagePress}
        activeOpacity={0.8}
        style={styles.imageContainer}>
        <Image
          style={styles.image}
          defaultSource={defaultImage}
          source={item.image_url ? {uri: item.image_url} : defaultImage}
          resizeMode={'cover'}
        />
      </TouchableOpacity>

      <Text text={item.title} variant="title-s-bold" />
      {!isMinimalContent ? (
        <Text
          text={eventCardTextUtil.formatInfo(
            item.location,
            item.start_date,
            item.start_time,
            item.end_time,
          )}
          variant="subtitle-m-regular"
          style={styles.subtitle}
        />
      ) : null}
    </View>
  );
};

export {EventCard};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SizeConversion.pixelSizeVertical(15),
  },
  imageContainer: {},
  image: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: SizeConversion.heightPixel(10),
    height: SizeConversion.heightPixel(200),
  },
  subtitle: {
    color: COLORS.gray[500],
  },
});
