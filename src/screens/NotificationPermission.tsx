import messaging from '@react-native-firebase/messaging';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILY } from '../assets/fonts';
import images from '../assets/images';
import { SCREEN_NAMES } from '../config';
import { colors } from '../config/colors';
import { AuthNavigatorProp } from '../navigation/AuthNavigator';

interface INotificationPermissions {
  navigation: AuthNavigatorProp;
}

const NotificationPermission: React.FC<INotificationPermissions> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      changeNavigationBarColor(colors.authBackground);
    }
  }, [isFocused]);

  const handleNotificationRequest = async () => {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    navigation.navigate(SCREEN_NAMES.headlines);
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleContainer}>
        <StatusBar
          backgroundColor={colors.authBackground}
          barStyle={'dark-content'}
        />
        <FastImage source={images.notif} style={styles.image} />
        <Text style={styles.mainText} testID="text-title">
          {'Get the most out of Blott ✅'}
        </Text>
        <Text style={styles.subText} testID="text-subtitle">
          {
            'Allow notifications to stay in the loop with your payments, requests and groups.'
          }
        </Text>
      </View>
      <View
        style={[
          styles.topPartitionContainer,
          {
            bottom: Platform.select({
              ios: insets.bottom,
              android: insets.bottom + 10,
            }),
          },
        ]}>
        <TouchableWithoutFeedback onPress={handleNotificationRequest}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} testID="text-continue">
              {'Continue'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default NotificationPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.authBackground,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  middleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 98,
    aspectRatio: 1,
  },
  mainText: {
    fontFamily: FONT_FAMILY.bold700,
    fontSize: 24,
    lineHeight: 30,
    color: colors.mainText,
    marginTop: 24,
    marginBottom: 16,
  },
  subText: {
    fontFamily: FONT_FAMILY.regular400,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text500Default,
    textAlign: 'center',
  },
  topPartitionContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: colors.text50,
    fontFamily: FONT_FAMILY.medium500,
    fontSize: 16,
    lineHeight: 24,
  },
});
