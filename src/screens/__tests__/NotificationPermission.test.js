import messaging from '@react-native-firebase/messaging';
import { render } from '@testing-library/react-native';
import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationPermission from '../NotificationPermission';

jest.mock('@react-native-firebase/messaging', () => ({
  requestPermission: jest.fn(),
}));
jest.mock('react-native-navigation-bar-color', () => jest.fn());
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
}));

PermissionsAndroid.request = jest.fn();

describe('NotificationPermission Screen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    messaging.requestPermission.mockClear();
    PermissionsAndroid.request.mockClear();
    jest.clearAllMocks();
  });

  it('renders static elements correctly', () => {
    const { getByText } = render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}>
        <NotificationPermission navigation={{ navigate: mockNavigate }} />
      </SafeAreaProvider>,
    );

    expect(getByText('Get the most out of Blott ✅')).toBeTruthy();
    expect(
      getByText(
        'Allow notifications to stay in the loop with your payments, requests and groups.',
      ),
    ).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });
});
