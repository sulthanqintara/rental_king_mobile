import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 18},
  contentContainer: {justifyContent: 'center', flex: 1},
  fieldContainer: {
    width: 'auto',
    height: 51,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 6,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    flex: 1,
    paddingVertical: 13,
    color: 'black',
  },
  fieldTitle: {marginTop: 12},
  error: {color: 'red'},
});
