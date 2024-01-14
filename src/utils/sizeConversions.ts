import {Dimensions, PixelRatio} from 'react-native';

const widthBaseScale = Dimensions.get('window').width / 375;
const heightBaseScale = Dimensions.get('window').height / 812;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const widthPixel = (size: number) => {
  return normalize(size, 'width');
};

const heightPixel = (size: number) => {
  return normalize(size, 'height');
};

const fontPixel = (size: number) => {
  return heightPixel(size);
};

const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};

const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};

export const SizeConversion = {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};
