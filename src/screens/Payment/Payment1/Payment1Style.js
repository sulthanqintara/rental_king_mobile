import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const d = Dimensions.get('window').width;

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
    fontSize: 16,
    color: 'black',
  },
  inputAndroid: {
    backgroundColor: 'rgba(223, 222, 222, 0.75)',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    color: 'black',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  durationModal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalDurationRow: {
    width: (d * 76) / 100,
    height: 50,
    justifyContent: 'center',
  },
  modalDurationText: {
    fontSize: 16,
    marginRight: 'auto',
  },
  disabled: {
    color: '#6666',
  },
});
