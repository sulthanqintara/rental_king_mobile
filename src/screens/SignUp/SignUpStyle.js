import {StyleSheet, Dimensions} from 'react-native';

const d = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto-Black',
    color: 'white',
    fontSize: 36,
    marginBottom: 125,
  },
  imageBackground: {
    flex: 1,
    position: 'absolute',
    width: d.width,
    height: d.height,
  },
  input: {
    width: 'auto',
    height: 50,
    backgroundColor: 'rgba(223, 222, 222, 0.5)',
    padding: 14,
    borderRadius: 10,
    marginVertical: 9,
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
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  whiteText: {
    color: 'white',
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  signUp: {flexDirection: 'row', justifyContent: 'center'},
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  darken: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    paddingTop: 80,
    paddingHorizontal: 29,
    flex: 1,
  },
});
