import {StyleSheet, Dimensions} from 'react-native';

const d = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    position: 'absolute',
    width: d.width,
    height: d.height,
  },
  title: {
    fontFamily: 'Roboto-Black',
    color: 'white',
    fontSize: 36,
    marginBottom: 170,
    textAlign: 'center',
  },
  titleAlt: {
    fontFamily: 'Roboto-Black',
    color: 'white',
    fontSize: 36,
    marginBottom: 75,
    textAlign: 'center',
  },
  input: {
    width: 'auto',
    height: 50,
    backgroundColor: 'rgba(223, 222, 222, 0.5)',
    padding: 14,
    borderRadius: 10,
    marginBottom: 9,
    marginTop: 20,
    color: 'white',
  },
  yellowButton: {
    backgroundColor: '#FFCD61',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 'auto',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: '900',
    fontSize: 18,
  },
  warning: {
    backgroundColor: 'rgba(252, 3, 3, 0.25)',
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  darken: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    paddingTop: 30,
    paddingHorizontal: 29,
    flex: 1,
  },
});
