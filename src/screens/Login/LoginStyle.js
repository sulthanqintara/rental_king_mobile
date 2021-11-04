import {Dimensions, StyleSheet} from 'react-native';

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
  },
  inputContainer: {
    width: 'auto',
    height: 50,
    backgroundColor: 'rgba(223, 222, 222, 0.5)',
    borderRadius: 10,
    marginVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: '#fc2828',
    fontWeight: '700',
    fontSize: 18,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    justifyContent: 'center',
  },
});
