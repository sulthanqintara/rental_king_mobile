import {StyleSheet} from 'react-native';

// const d = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 18,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    elevation: 10,
  },
  filterText: {marginRight: 'auto'},
  searchContainer: {
    paddingHorizontal: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardContainer: {
    borderRadius: 20,
    marginHorizontal: 18,
    marginBottom: 13,
    marginTop: 13,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 'auto',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  searchInput: {paddingHorizontal: 10},
  cardTextContainer: {padding: 15},
  cardLocation: {color: '#999999', marginBottom: 5},
  cardModel: {fontSize: 18, fontWeight: '600', marginBottom: 5},
  cardBottomTextContainer: {flexDirection: 'row', alignItems: 'center'},
  cardBottomLeftContainer: {marginRight: 'auto'},
  available: {fontWeight: '700', color: '#087E0D'},
  notAvailable: {fontWeight: '700', color: 'red'},
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
  },
});
