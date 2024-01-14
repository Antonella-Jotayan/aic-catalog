import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SizeConversion} from '@app/utils/sizeConversions';
import {Text} from '@app/components/ui/Text/Text';
import {COLORS} from '@app/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {TextUtils} from '../../utils/formatText';
import {EventDTO} from '@app/api/models/Event/Event';
import FastImage from 'react-native-fast-image';

interface EventItemProps {
  item: EventDTO;
}

const EventItem = ({item}: EventItemProps) => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('Event', {
      eventId: item.id,
    });
  };

  const defaultImage = require('../../../../assets/images/placeholder-image.png');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImagePress}
        activeOpacity={0.8}
        style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          defaultSource={defaultImage}
          source={{
            uri: `${item.image_url}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>

      <Text text={item.title} variant="title-s-bold" />

      <Text
        text={TextUtils.formatInfo(
          item.location,
          item.start_date,
          item.start_time,
          item.end_time,
        )}
        variant="subtitle-m-regular"
        style={styles.subtitle}
      />
    </View>
  );
};

export {EventItem};

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
