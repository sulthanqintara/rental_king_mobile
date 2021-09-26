import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  center: {textAlign: 'center'},
  paymentCodeTitle: {fontSize: 18, fontWeight: '700'},
  paymentCode: {fontSize: 36, fontWeight: '700', marginVertical: 10},
  smallTxt: {fontSize: 13, marginVertical: 2},
  timer: {
    color: 'rgba(155, 10, 10, 1)',
    marginVertical: 15,
    fontSize: 24,
    fontWeight: '700',
  },
  normalTxt: {fontSize: 16, marginVertical: 5, textAlign: 'center'},
  owner: {
    borderBottomWidth: 2,
    paddingBottom: 20,
    borderBottomColor: '#DFDEDE',
    marginBottom: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCode: {
    fontSize: 16,
    color: 'green',
    fontWeight: '700',
  },
  copyBtn: {
    width: 210,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    borderRadius: 10,
  },
  copyBtnContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 2,
    borderColor: '#DFDEDE',
  },
  prepayment: {
    fontSize: 36,
    fontWeight: '600',
    paddingTop: 10,
    marginRight: 'auto',
  },
  infoIcon: {
    paddingTop: 13,
  },
});
