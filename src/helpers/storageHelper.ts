import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@BLOTT' as const;

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    return jsonValue != null ? (JSON.parse(jsonValue) as User) : null;
  } catch (e) {
    // read error
  }
};

const setUser = async (user: User) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(KEY, jsonValue);
  } catch (error) {
    // read error
  }
};

const storageHelper = {
  getUser,
  setUser,
};

export default storageHelper;
