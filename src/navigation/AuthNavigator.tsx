import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { SCREEN_NAMES } from '../config';
import Credentials from '../screens/Credentials';
import NotificationPermission from '../screens/NotificationPermission';
import Headlines from '../screens/Headlines';
import Web from '../screens/Web';

export type AuthStackParamList = {
  credentials: undefined;
  notifications: undefined;
  headlines: undefined;
  web: { url: string };
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
      <AuthStack.Screen
        name={SCREEN_NAMES.headlines}
        component={Headlines}
        options={{
          gestureEnabled: false,
        }}
      />
      <AuthStack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <AuthStack.Screen name={SCREEN_NAMES.web} component={Web} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export type AuthNavigatorProp = StackNavigationProp<AuthStackParamList>;

export default AuthNavigator;
