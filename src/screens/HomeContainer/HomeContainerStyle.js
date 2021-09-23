import {StyleSheet} from 'react-native';

// const d = Dimensions.get('window');

export default StyleSheet.create({
  //   container: {flex: 1},
  content: {padding: 15},
  headerImage: {resizeMode: 'cover', height: 280, width: 'auto'},
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 18,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 22,
  },
});
