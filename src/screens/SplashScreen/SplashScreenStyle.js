import {Dimensions, StyleSheet} from 'react-native';
const d = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: 'auto',
    height: d.height,
    backgroundColor: '#FFCD61',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 50, fontWeight: '800'},
});
