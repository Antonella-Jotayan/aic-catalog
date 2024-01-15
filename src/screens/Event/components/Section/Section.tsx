import {StyleSheet, View, useWindowDimensions} from 'react-native';
import React, {FC, useMemo} from 'react';
import {Text, textStyles} from '@app/components/ui/Text/Text';
import {SizeConversion} from '@app/utils/sizeConversions';
import {COLORS} from '@app/theme/colors';
import RenderHTML from 'react-native-render-html';

interface Section {
  title: string;
  description: string;
  isHtml?: boolean;
}

const Section: FC<Section> = ({title, description, isHtml = false}) => {
  const {width} = useWindowDimensions();
  const htmlObj = useMemo(() => {
    return {html: description};
  }, [description]);

  return (
    <View style={styles.container}>
      <Text text={title} variant="subtitle-l-medium" />

      {isHtml ? (
        <RenderHTML
          source={htmlObj}
          baseStyle={textStyles['body-s-regular']}
          contentWidth={width}
        />
      ) : (
        <Text text={description} variant="body-s-regular" />
      )}
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
