import {Dimensions, StyleSheet} from 'react-native';
const d = Dimensions.get('window');
export default StyleSheet.create({
  titleContainer: {marginBottom: 10},
  title: {
    borderBottomWidth: 1,
    padding: -5,
    fontSize: 28,
    fontWeight: '500',
  },
  flexRow: {flexDirection: 'row'},
  inputAndroid: {
    backgroundColor: 'rgba(57, 57, 57, 0.1)',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    width: 'auto',
    color: 'black',
    paddingVertical: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: (d.width * 3) / 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  selection: {
    width: (d.width * 3) / 4,
    paddingHorizontal: 20,
  },
  textStyle: {fontSize: 16, paddingVertical: 10},
  negativePadding: {padding: -5},
  marginPic: {marginRight: 20, marginLeft: 10},
});
