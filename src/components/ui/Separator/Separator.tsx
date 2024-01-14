import {COLORS} from '@app/theme/colors';
import {SizeConversion} from '@app/utils/sizeConversions';
import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface SeparatorProps {
  style?: ViewStyle;
}

const Separator: FC<SeparatorProps> = ({style, ...props}) => {
  return <View style={[styles.separator, style]} {...props} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.gray[300],
    marginVertical: SizeConversion.pixelSizeVertical(10),
  },
});

export {Separator};
