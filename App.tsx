import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { colors } from './src/config/colors';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {
  useEffect(() => {
    const hideSplash = async () => {
      await BootSplash.hide({ fade: true });
      changeNavigationBarColor(colors.authBackground);
    };
    hideSplash();
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Provider store={store}>
            <StatusBar
              backgroundColor={colors.authBackground}
              barStyle={'dark-content'}
            />
            <RootNavigator />
          </Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
