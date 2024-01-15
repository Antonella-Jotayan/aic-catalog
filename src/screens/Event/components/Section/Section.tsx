import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Text} from '@app/components/ui/Text/Text';
import {SizeConversion} from '@app/utils/sizeConversions';
import {COLORS} from '@app/theme/colors';

interface Section {
  title: string;
  description: string;
}

const Section: FC<Section> = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text text={title} variant="subtitle-l-medium" />
      <Text text={description} variant="body-s-regular" />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[300],
    paddingTop: SizeConversion.pixelSizeVertical(5),
    marginTop: SizeConversion.pixelSizeVertical(20),
  },
});
