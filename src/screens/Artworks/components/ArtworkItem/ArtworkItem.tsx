import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {SizeConversion} from '@app/utils/sizeConversions';
import {Text} from '@app/components/ui/Text/Text';
import {COLORS} from '@app/theme/colors';
import {TextUtils} from '../../utils/formatTitle';
import {useNavigation} from '@react-navigation/native';

interface ArtworkItem {
  item: FilteredArtworkDTO;
}
const ArtworkItem: FC<ArtworkItem> = ({item}) => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('Artwork', {
      artworkId: item.id,
    });
  };
  const defaultImage = require('../../../../assets/images/placeholder-image.png');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
        <Image
          style={styles.image}
          defaultSource={defaultImage}
          source={{
            uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
          }}
          resizeMode={'cover'}
        />
      </TouchableOpacity>

      <Text
        text={TextUtils.formatTitle(item.title, item.date_end)}
        variant="title-s-bold"
      />
      {item.artist_title ? (
        <Text
          text={TextUtils.formatSubtitle(item.artist_title)}
          variant="subtitle-m-regular"
          style={styles.subtitle}
        />
      ) : (
        <Text text="-" variant="subtitle-m-regular" style={styles.subtitle} />
      )}
    </View>
  );
};

export {ArtworkItem};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    marginBottom: SizeConversion.heightPixel(10),
    height: SizeConversion.heightPixel(200),
  },
  subtitle: {
    color: COLORS.gray[500],
  },
});
