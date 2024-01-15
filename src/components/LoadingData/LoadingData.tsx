import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const LoadingData = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
    </View>
  );
};

export {LoadingData};

const styles = StyleSheet.create({
  loading: {alignSelf: 'center', flex: 1},
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
