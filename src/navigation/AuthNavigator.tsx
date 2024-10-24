import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_NAMES } from '../config';
import Credentials from '../screens/Credentials';

export type AuthStackParamList = {
  credentials: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={SCREEN_NAMES.credentials}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name={SCREEN_NAMES.credentials}
        component={Credentials}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
