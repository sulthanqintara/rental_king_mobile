import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  vehiclePic: {width: 'auto', height: 201, padding: 20},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCD61',
    width: 50,
    height: 23,
    borderRadius: 30,
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  ratingTxt: {color: 'white'},
  mainData: {},
  textGap: {
    paddingVertical: 10,
  },
  identity: {
    borderTopWidth: 2,
    borderColor: '#DFDEDE',
    marginTop: 10,
    paddingTop: 10,
  },
  identityTxt: {paddingVertical: 5},
});
