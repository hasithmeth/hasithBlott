import { Formik, FormikProps } from 'formik';
import React, { useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { FONT_FAMILY } from '../assets/fonts';
import NavImage from '../components/NavImage';
import StyledInput from '../components/StyledInput';
import { SCREEN_NAMES } from '../config';
import { colors } from '../config/colors';
import { useAppDispatch } from '../hooks';
import { AuthNavigatorProp } from '../navigation/AuthNavigator';
import { setUser } from '../store/slices/authSlice';

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

interface IFormValues {
  firstName: string;
  lastName: string;
}

interface ICredentials {
  navigation: AuthNavigatorProp;
}

const Credentials: React.FC<ICredentials> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const firstNameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);

  const initialValues: IFormValues = {
    firstName: '',
    lastName: '',
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const gesture = Gesture.Pan().onUpdate(event => {
    if (event.translationY > 50) {
      runOnJS(handleKeyboardDismiss)();
    }
  });

  const handleNavigation = (values: IFormValues) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
    } as User;
    dispatch(setUser(user));
    navigation.navigate(SCREEN_NAMES.notifications);
  };

  const handleFirstNameSubmitEditing = () => {
    lastNameInputRef.current?.focus();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      validateOnMount
      onSubmit={handleNavigation}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
      }: FormikProps<IFormValues>) => {
        return (
          <GestureDetector gesture={gesture}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
              <View style={[styles.container, { paddingTop: insets.top }]}>
                <Text style={styles.titleText}>{'Your Legal Name'}</Text>
                <Text style={styles.subtitleText}>
                  {
                    'We need to know a bit about you so that we can create your account.'
                  }
                </Text>
                <StyledInput
                  placeholder={'First name'}
                  onChangeText={handleChange('firstName')}
                  value={values.firstName}
                  onBlur={handleBlur('firstName')}
                  ref={firstNameInputRef}
                  onSubmitEditing={handleFirstNameSubmitEditing}
                  returnKeyType={'next'}
                  enablesReturnKeyAutomatically={true}
                />
                <View style={styles.inputsMargin} />
                <StyledInput
                  placeholder={'Last name'}
                  onChangeText={handleChange('lastName')}
                  value={values.lastName}
                  onBlur={handleBlur('lastName')}
                  ref={lastNameInputRef}
                  returnKeyType={'done'}
                  enablesReturnKeyAutomatically={true}
                />
                {Platform.OS === 'android' ? (
                  <View style={styles.bottomContainer}>
                    <View style={styles.navComponentAndroid}>
                      <NavImage enabled={isValid} onPress={handleSubmit} />
                    </View>
                  </View>
                ) : (
                  <KeyboardAvoidingView
                    style={styles.bottomContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <NavImage enabled={isValid} onPress={handleSubmit} />
                  </KeyboardAvoidingView>
                )}
              </View>
            </TouchableWithoutFeedback>
          </GestureDetector>
        );
      }}
    </Formik>
  );
};

export default Credentials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
    paddingHorizontal: 24,
  },
  titleText: {
    fontFamily: FONT_FAMILY.bold700,
    fontSize: 30,
    paddingVertical: 10,
    lineHeight: 37.5,
    color: colors.text900Default,
  },
  subtitleText: {
    fontFamily: FONT_FAMILY.regular400,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text500Default,
    marginTop: 16,
    marginBottom: 24,
  },
  inputsMargin: {
    height: 8,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  avoidingContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  navComponentAndroid: {
    bottom: 24,
  },
});
