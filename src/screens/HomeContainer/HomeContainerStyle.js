import {StyleSheet} from 'react-native';

// const d = Dimensions.get('window');

export default StyleSheet.create({
  //   container: {flex: 1},
  content: {padding: 15},
  headerImage: {resizeMode: 'cover', height: 280, width: 'auto'},
  titleContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 18,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 22,
    marginRight: 'auto',
  },
  cardContainer: {
    marginBottom: 15,
  },
  addBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#FFCD61',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addTxt: {
    fontSize: 20,
    fontWeight: '700',
  },
  viewMore: {
    textDecorationLine: 'underline',
  },
});
