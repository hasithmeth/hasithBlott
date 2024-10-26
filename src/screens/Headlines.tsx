import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILY } from '../assets/fonts';
import { colors } from '../config/colors';
import storageHelper from '../helpers/storageHelper';
import { AuthNavigatorProp } from '../navigation/AuthNavigator';

interface IHeadlines {
  navigation: AuthNavigatorProp;
}

const Headlines: React.FC<IHeadlines> = () => {
  const [user, setUser] = useState<User | null>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();

  const loadUser = async () => {
    const storedUser = await storageHelper.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  useEffect(() => {
    loadUser();
    if (isFocused) {
      changeNavigationBarColor(colors.black);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <>
        <StatusBar
          backgroundColor={colors.listBackground}
          barStyle={'light-content'}
        />
        <View
          style={[
            styles.titleBackground,
            {
              width,
              height: Platform.select({
                android: styles.titleBackground.height - 20,
              }),
            },
          ]}
        />
        <Text
          style={[
            styles.titleText,
            {
              paddingTop: Platform.select({
                android: styles.titleText.paddingTop + 15,
                ios: styles.titleText.paddingTop + insets.top,
              }),
            },
          ]}>{`Hey ${user?.firstName}`}</Text>
      </>
    </View>
  );
};

export default Headlines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 18,
  },
  titleText: {
    fontFamily: FONT_FAMILY.black900,
    color: colors.white,
    fontSize: 32,
    lineHeight: 35,
    paddingTop: 8,
  },
  titleBackground: {
    height: 181,
    backgroundColor: colors.listBackground,
    position: 'absolute',
    top: 0,
  },
});
