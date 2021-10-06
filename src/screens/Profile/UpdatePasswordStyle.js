import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 18},
  contentContainer: {justifyContent: 'center', flex: 1},
  field: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    width: 'auto',
    height: 51,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 6,
    color: 'black',
  },
  fieldTitle: {marginTop: 12},
  error: {color: 'red'},
});
