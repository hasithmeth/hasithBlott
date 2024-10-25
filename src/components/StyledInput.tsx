import { Platform, StyleSheet, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FONT_FAMILY } from '../assets/fonts';
import { colors } from '../config/colors';

interface IStyledInput extends TextInputProps {}

const StyledInput: React.FC<IStyledInput> = props => {
  const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderColor: colors.muted300,
      justifyContent: 'center',
      marginBottom: 25,
    },
    textInput: {
      fontFamily: FONT_FAMILY.regular400,
      color: colors.text900Default,
      fontSize: 20,
      lineHeight: Platform.select({ android: 30 }),
      paddingVertical: 8,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.textInput}
        placeholderTextColor={colors.textPlaceholder}
      />
    </View>
  );
};

export default StyledInput;
