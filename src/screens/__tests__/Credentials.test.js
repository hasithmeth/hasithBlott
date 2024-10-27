import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Credentials from '../Credentials';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('Credentials screen validation', () => {
  it('should only be valid when both first and last names are present', async () => {
    const { getByTestId } = render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}>
        <Credentials navigation={{ navigate: jest.fn() }} />
      </SafeAreaProvider>,
    );

    const firstNameInput = getByTestId('first-name');
    const lastNameInput = getByTestId('last-name');
    const isValidText = getByTestId('is-valid');

    await waitFor(() => expect(isValidText.props.children).toBe('Invalid'));

    fireEvent.changeText(firstNameInput, 'John');
    await waitFor(() => expect(isValidText.props.children).toBe('Invalid'));

    fireEvent.changeText(lastNameInput, 'Doe');
    await waitFor(() => expect(isValidText.props.children).toBe('Valid'));
  });
});
