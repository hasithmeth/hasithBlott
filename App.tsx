import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { colors } from './src/config/colors';

function App(): JSX.Element {
  useEffect(() => {
    const hideSplash = async () => {
      await BootSplash.hide({ fade: true });
      changeNavigationBarColor(colors.authBackground);
    };
    hideSplash();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello Blott</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
