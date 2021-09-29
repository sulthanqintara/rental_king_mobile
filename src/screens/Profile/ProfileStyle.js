import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileImage: {width: 50, height: 50, borderRadius: 25, marginRight: 20},
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    elevation: 10,
  },
  profileHeaderText: {
    fontSize: 22,
    fontWeight: '700',
  },
  optionBackground: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  profileOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  profileOptionText: {
    fontSize: 18,
    fontWeight: '400',
  },
  logoutBtn: {
    width: 'auto',
    height: 50,
    margin: 16,
    justifyContent: 'center',
    backgroundColor: '#FFCD61',
    alignItems: 'center',
    borderRadius: 10,
  },
  flexRow: {flexDirection: 'row'},
});
