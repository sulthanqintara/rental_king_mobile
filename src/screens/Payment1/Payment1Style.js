import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  bigTxt: {fontSize: 24, fontWeight: '700'},
  container: {paddingHorizontal: 20, flex: 1, backgroundColor: 'white'},
  flexRow: {flexDirection: 'row'},
  header: {alignItems: 'center', paddingTop: 20},
  headerTitle: {marginLeft: 15},
  progress: {justifyContent: 'center', marginVertical: 30},
  progressCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  progressTxt: {
    color: 'white',
    fontWeight: '700',
  },
  inactiveCircle: {
    backgroundColor: '#DFDEDE',
  },
  txtInput: {
    backgroundColor: 'rgba(223, 222, 222, 0.75)',
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
  },
  inputAndroid: {
    backgroundColor: 'rgba(223, 222, 222, 0.75)',
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
    color: 'black',
  },
  dropdownIcon: {
    paddingRight: 10,
    paddingVertical: 25,
  },
  order: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCD61',
    height: 70,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
});
