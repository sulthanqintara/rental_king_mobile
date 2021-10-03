import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  flexRow: {flexDirection: 'row'},
  bigTxt: {fontSize: 24, fontWeight: '600'},
  MediumTxt: {fontSize: 18, fontWeight: '500'},
  MediumGreyTxt: {fontSize: 18, color: '#999999', marginRight: 5},
  justifyContentCenter: {justifyContent: 'center'},
  alignItemsCenter: {alignItems: 'center'},
  headerTitle: {marginLeft: 24},
  reset: {
    marginLeft: 'auto',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentContainer: {
    marginHorizontal: 5,
    marginTop: 20,
  },
  filterTitle: {marginRight: 'auto', marginVertical: 20},
  modal: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 35,
  },
  selection: {paddingVertical: 15},
  selectionTxt: {fontSize: 16},
  apply: {
    width: 'auto',
    borderRadius: 10,
    backgroundColor: '#FFCD61',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 'auto',
  },
});
