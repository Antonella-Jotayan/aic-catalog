import React, {memo} from 'react';

import {SvgProps} from 'react-native-svg';
import {SVG_IMAGES} from './constants';
import {COLORS} from '@app/theme/colors';

export type SvgImageName = keyof typeof SVG_IMAGES;

export type SvgImageProps = SvgProps & {
  name: SvgImageName;
  color?: string;
  type?: 'icon' | 'illustration';
};

const Icon = ({name, color = COLORS.black, ...props}: SvgImageProps) => {
  const SVG = SVG_IMAGES[name];
  return <SVG fill={color} fillOpacity={1} {...props} accessible />;
};

const Memoized = memo(Icon);

export {Memoized as Icon};
