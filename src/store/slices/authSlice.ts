import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

/**
 * Auth state
 * @property {string} isSignedUp - Basic auth state of the app
 * @property {User} userDetails - Credentials of the current user
 */
export interface IAuthState {
  isSignedUp: boolean;
  userDetails: User;
}

const initialState: IAuthState = {
  isSignedUp: false,
  userDetails: {
    firstName: '',
    lastName: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
      state.isSignedUp = true;
    },
    resetUser: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {setUser, resetUser} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.userDetails;
export const selectIsSignedUp = (state: RootState) => state.auth.isSignedUp;

export default authSlice.reducer;
