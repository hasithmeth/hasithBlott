import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {
  AuthNavigatorProp,
  AuthStackParamList,
  WebRouteParams,
} from '../navigation/AuthNavigator';
import { RouteProp } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';

type WebProps = StackScreenProps<AuthStackParamList, 'web'>;

const Web: React.FC<WebProps> = ({ route, navigation }) => {
  const { url } = route.params;

  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      {Platform.OS === 'ios' ? (
        <View style={styles.pillContainer}>
          <View style={styles.pill} />
        </View>
      ) : (
        <View style={styles.pillContainerAndroid}>
          <TouchableWithoutFeedback onPress={handleGoBack}>
            <FastImage source={images.closeIcon} style={styles.closeImage} />
          </TouchableWithoutFeedback>
        </View>
      )}
      <WebView source={{ uri: url }} />
    </View>
  );
};

export default Web;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pillContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillContainerAndroid: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'black',
    paddingRight: 16,
  },
  pill: {
    width: 45,
    height: 5,
    backgroundColor: colors.black,
    opacity: 0.5,
    borderRadius: 10,
  },
  closeImage: {
    height: 16,
    aspectRatio: 1,
    tintColor: colors.black,
    opacity: 1,
  },
});
