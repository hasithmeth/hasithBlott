import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../config/colors';

const Credentials = () => {
  return (
    <View style={styles.container}>
      <Text>Credentials</Text>
    </View>
  );
};

export default Credentials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.authBackground,
  },
});
