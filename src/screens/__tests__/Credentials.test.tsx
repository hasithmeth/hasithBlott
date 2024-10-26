import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Credentials from '../Credentials';
import { AuthNavigatorProp } from '../../navigation/AuthNavigator';
import { SCREEN_NAMES } from '../../config';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock('../../helpers/storageHelper', () => ({
  setUser: jest.fn(),
}));

describe('Credentials Component', () => {
  let navigationMock: Partial<AuthNavigatorProp>;

  beforeEach(() => {
    navigationMock = { navigate: jest.fn() };
  });

  it('renders first name and last name inputs and submit button', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Credentials navigation={navigationMock as AuthNavigatorProp} />,
    );

    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const submitButton = getByTestId('NavImage');

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('enables the submit button when form inputs are valid', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Credentials navigation={navigationMock as AuthNavigatorProp} />,
    );

    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const submitButton = getByTestId('NavImage');

    // Initially, submit button should be disabled
    expect(submitButton.props.enabled).toBe(false);

    // Enter valid input for both fields
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');

    // Wait for the button to be enabled
    await waitFor(() => expect(submitButton.props.enabled).toBe(true));
  });

  it('submits the form when the submit button is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Credentials navigation={navigationMock as AuthNavigatorProp} />,
    );

    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const submitButton = getByTestId('NavImage');

    // Fill out the form
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');

    // Wait for the button to become enabled
    await waitFor(() => expect(submitButton.props.enabled).toBe(true));

    // Submit the form
    fireEvent.press(submitButton);

    // Expect navigation to have been called with the notifications screen
    await waitFor(() =>
      expect(navigationMock.navigate).toHaveBeenCalledWith(
        SCREEN_NAMES.notifications,
      ),
    );
  });
});
