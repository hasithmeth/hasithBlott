/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';
import { colors } from '../config/colors';

interface INavImage {
  enabled: boolean;
  onPress: () => void;
  testID?: string;
}

const NavImage: React.FC<INavImage> = ({ enabled, onPress }) => {
  const handlePress = () => {
    if (enabled) {
      onPress();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.container,
          {
            marginBottom: Platform.select({
              ios: 24,
            }),
          },
          {
            opacity: enabled ? 1 : 0.4,
          },
        ]}>
        <FastImage source={images.nextIcon} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NavImage;

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: 56,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 12,
    height: 20,
  },
});
