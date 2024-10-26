import AuthNavigator from './AuthNavigator';

interface IRootNavigator {}

const RootNavigator: React.FC<IRootNavigator> = () => {
  return <AuthNavigator />;
};

export default RootNavigator;
