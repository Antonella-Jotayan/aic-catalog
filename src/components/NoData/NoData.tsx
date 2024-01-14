import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Text} from '../ui/Text/Text';

interface NoDataProps {
  text: string;
}

const NoData: FC<NoDataProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text text={text} variant="subtitle-l-medium" style={styles.text} />
    </View>
  );
};

export {NoData};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
