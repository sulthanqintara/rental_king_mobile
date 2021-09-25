import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    width: 'auto',
    height: 250,
    paddingHorizontal: 18,
    paddingTop: 30,
  },
  headerController: {flexDirection: 'row'},
  back: {marginRight: 'auto'},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCD61',
    width: 50,
    height: 23,
    borderRadius: 30,
    marginRight: 10,
  },
  ratingTxt: {color: 'white'},
  rightHeader: {flexDirection: 'row', alignItems: 'center'},
  container: {
    padding: 18,
  },
  titleContainer: {flexDirection: 'row', marginBottom: 10},
  title: {
    fontSize: 28,
    fontWeight: '500',
    marginRight: 'auto',
  },
  textPadding: {
    paddingVertical: 3,
  },
  greenTxt: {color: 'green', fontWeight: '500', marginBottom: 20},
  location: {
    flexDirection: 'row',
    marginBottom: 13,
    alignItems: 'center',
  },
  locationLogo: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255, 199, 167, 0.5)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  grayTxt: {color: '#999999'},
  selector: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  counter: {flexDirection: 'row', alignItems: 'center'},
  counterBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFCD61',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {fontSize: 15, fontWeight: '900', marginHorizontal: 20},
  date: {
    backgroundColor: 'rgba(57, 57, 57, 0.1)',
    paddingVertical: 15,
    borderRadius: 10,
    paddingLeft: 16,
  },
});
