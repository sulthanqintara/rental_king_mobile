import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
  },
  title: {
    marginTop: 25,
    flexDirection: 'row',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    paddingBottom: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 35,
  },
  profilebtn: {
    backgroundColor: '#FFCD61',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17.5,
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  genderOptions: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  subTitle: {
    color: '#BBBBBB',
  },
  field: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    width: 'auto',
    height: 51,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 22,
  },
  save: {
    width: 'auto',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFCD61',
    marginBottom: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveTxt: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileContainer: {alignItems: 'center'},
});
