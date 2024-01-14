import {StyleSheet, Text as RNText, TextStyle} from 'react-native';
import React, {FC} from 'react';
import {SizeConversion} from '@app/utils/sizeConversions';
import {COLORS} from '@app/theme/colors';

interface TextProps {
  text: string;
  variant?: keyof typeof textStyles;
  style?: TextStyle;
}

const Text: FC<TextProps> = ({
  text,
  variant = 'body-s-regular',
  style,
  ...props
}) => {
  return (
    <RNText style={[textStyles[variant], generalStyles.text, style]} {...props}>
      {text}
    </RNText>
  );
};

export {Text};

const textStyles = StyleSheet.create({
  'title-l-bold': {
    color: COLORS.black,
    fontFamily: 'Lora-Bold',
    fontSize: SizeConversion.fontPixel(18),
    lineHeight: SizeConversion.fontPixel(27),
  },
  'title-l-semibold': {
    color: COLORS.black,
    fontFamily: 'Lora-SemiBold',
    fontSize: SizeConversion.fontPixel(18),
    lineHeight: SizeConversion.fontPixel(27),
  },
  'title-s-bold': {
    color: COLORS.black,
    fontFamily: 'Lora-Bold',
    fontSize: SizeConversion.fontPixel(12),
    lineHeight: SizeConversion.fontPixel(18),
  },
  'title-m-regular': {
    color: COLORS.black,
    fontFamily: 'Lora-Regular',
    fontSize: SizeConversion.fontPixel(15),
    lineHeight: SizeConversion.fontPixel(27),
  },
  'subtitle-l-medium': {
    color: COLORS.black,
    fontFamily: 'Roboto-Medium',
    fontSize: SizeConversion.fontPixel(14),
    lineHeight: SizeConversion.fontPixel(20),
  },
  'subtitle-m-regular': {
    color: COLORS.black,
    fontFamily: 'Roboto-Regular',
    fontSize: SizeConversion.fontPixel(12),
    lineHeight: SizeConversion.fontPixel(20),
  },
  'body-s-regular': {
    color: COLORS.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: SizeConversion.fontPixel(12),
    lineHeight: SizeConversion.fontPixel(18),
  },
  'body-xs-regular': {
    color: COLORS.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: SizeConversion.fontPixel(10),
    lineHeight: SizeConversion.fontPixel(18),
  },
});

const generalStyles = StyleSheet.create({
  text: {
    marginVertical: SizeConversion.pixelSizeVertical(2),
  },
});
