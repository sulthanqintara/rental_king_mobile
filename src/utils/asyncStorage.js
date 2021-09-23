import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async stringValue => {
  try {
    const jsonValue = await AsyncStorage.getItem(String(stringValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeData = async (stringValue, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(String(stringValue), jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const removeFew = async () => {
  const keys = ['userInfo', 'token'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
  }

  console.log('Done');
};
