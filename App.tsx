import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';

function App(): JSX.Element {
  useEffect(() => {
    const hideSplash = async () => {
      await BootSplash.hide({fade: true});
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
