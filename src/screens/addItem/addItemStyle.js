import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const d = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 30,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontWeight: '700',
    fontSize: 18,
    marginRight: 'auto',
  },
  headerCancel: {
    color: 'grey',
  },
  addPictureContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(186, 186, 186, 0.35)',
    borderRadius: 75,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginVertical: 20,
  },
  addPicButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFCD61',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  addCamIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  addBtnTxt: {
    fontSize: 22,
    fontWeight: '700',
  },
  inputFormContainer: {
    paddingHorizontal: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
  },
  inputFormTitle: {fontSize: 16, fontWeight: '700', marginTop: 20},
  inputAndroid: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  dropdownIcon: {paddingTop: 35, paddingRight: 20},
  dropDownPicker: {marginTop: 20},
  saveButton: {
    width: 'auto',
    backgroundColor: '#FFCD61',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 63,
    marginVertical: 20,
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignItemsCenter: {alignItems: 'center'},
  justifyContentCenter: {justifyContent: 'center'},
  counterButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFCD61',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterTxt: {fontWeight: '900', fontSize: 15},
  counter: {paddingTop: 20, marginLeft: 'auto'},
  counterContainer: {marginBottom: 30},
  negativeCounter: {marginRight: 20},
  positiveCounter: {marginLeft: 20},
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    width: d * 0.76,
    paddingLeft: d * 0.05,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalRow: {
    height: 50,
    justifyContent: 'center',
  },
  disabled: {
    color: '#6666',
  },
});
