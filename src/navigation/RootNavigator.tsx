import { useAppSelector } from '../hooks';
import { selectIsSignedUp } from '../store/slices/authSlice';
import AuthNavigator from './AuthNavigator';

interface IRootNavigator {}

const RootNavigator: React.FC<IRootNavigator> = () => {
  const isSignedUp = useAppSelector(selectIsSignedUp);

  if (isSignedUp) {
    return <AuthNavigator />;
  }
  return <AuthNavigator />;
};

export default RootNavigator;
