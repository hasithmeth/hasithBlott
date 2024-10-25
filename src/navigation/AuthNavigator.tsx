import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { SCREEN_NAMES } from '../config';
import Credentials from '../screens/Credentials';
import NotificationPermission from '../screens/NotificationPermission';

export type AuthStackParamList = {
  credentials: undefined;
  notifications: undefined;
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
      <AuthStack.Screen
        name={SCREEN_NAMES.notifications}
        component={NotificationPermission}
      />
    </AuthStack.Navigator>
  );
};

export type AuthNavigatorProp = StackNavigationProp<AuthStackParamList>;

export default AuthNavigator;
