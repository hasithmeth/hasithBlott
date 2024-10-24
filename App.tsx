import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Provider } from 'react-redux';
import { colors } from './src/config/colors';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store/store';

function App(): JSX.Element {
  useEffect(() => {
    const hideSplash = async () => {
      await BootSplash.hide({ fade: true });
      changeNavigationBarColor(colors.authBackground);
    };
    hideSplash();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar
          backgroundColor={colors.authBackground}
          barStyle={'dark-content'}
        />
        <RootNavigator />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
