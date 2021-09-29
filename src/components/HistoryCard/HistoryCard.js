import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {API_URL} from '@env';
import {RadioButton} from 'react-native-paper';

const HistoryCard = props => {
  const {
    id,
    vehicleName,
    rentStart,
    rentFinish,
    price,
    returned,
    userPaid,
    sellerPaid,
    authLevel,
    vehiclePic,
    amountRented,
    idCard,
    navigation,
  } = props;
  const passedData = {
    id,
    model: vehicleName,
    vehicleImage: API_URL + vehiclePic.split(',')[0],
    amount_rented: amountRented,
    duration: rentFinish.getDate() - rentStart.getDate(),
    rent_start_date: `${rentStart.getFullYear()}-${
      rentStart.getMonth() + 1
    }-${rentStart.getDate()}`,
    rent_finish_date: `${rentFinish.getFullYear()}-${
      rentFinish.getMonth() + 1
    }-${rentFinish.getDate()}`,
    idCard,
    prepayment: price,
  };
  if (!userPaid && authLevel === 3) {
    return (
      <View style={styles.contentContainer}>
        <Pressable
          style={styles.leftContainer}
          onPress={() => {
            navigation.navigate('Payment3', {passedData});
          }}>
          <View style={styles.cardContainer}>
            <Text style={styles.textHeight}>
              Please finish your payment for {vehicleName}
            </Text>
          </View>
        </Pressable>
        <View style={styles.selectContainer}>
          <Ionicons name="chevron-forward" size={25} color="gray" />
        </View>
      </View>
    );
  }
  if (userPaid && authLevel !== 3 && !sellerPaid) {
    return (
      <View style={styles.contentContainer}>
        <Pressable
          style={styles.leftContainer}
          onPress={() => {
            navigation.navigate('Payment3', {passedData});
          }}>
          <View style={styles.cardContainer}>
            <Text style={styles.textHeight}>
              Please confirm payment for {vehicleName}
            </Text>
          </View>
        </Pressable>
        <View style={styles.selectContainer}>
          <Ionicons name="chevron-forward" size={25} color="gray" />
        </View>
      </View>
    );
  }
  if (sellerPaid) {
    return (
      <View style={styles.contentContainer}>
        <Pressable
          style={styles.leftContainer}
          onPress={() => {
            navigation.navigate('FinishedPayment', {passedData});
          }}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.imageCard}
              source={{
                uri: `${API_URL}${vehiclePic?.split(',')[0]}`,
              }}
            />
            <View>
              <Text style={styles.fontBold}>{vehicleName}</Text>
              <Text>
                {rentStart.getFullYear()}-{rentStart.getMonth()}-
                {rentStart.getDate()} to {rentFinish.getFullYear()}-
                {rentFinish.getMonth()}-{rentFinish.getDate()}
              </Text>
              <Text style={styles.fontBold}>Prepayment : Rp {price}</Text>
              {returned ? (
                <Text style={styles.returned}>Has been returned</Text>
              ) : (
                <Text style={styles.notReturned}>Has not been returned</Text>
              )}
            </View>
          </View>
        </Pressable>
        <View style={styles.selectContainer}>
          <RadioButton value={id} color="#FFCD61" />
        </View>
        {console.log(props)}
      </View>
    );
  }
  return <></>;
};

const d = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: 'white', flex: 1},
  contentContainer: {flexDirection: 'row'},
  timeStamp: {color: '#C4C4C4', textAlign: 'center', marginBottom: 10},
  select: {flex: 1},
  leftContainer: {
    width: (d.width * 3) / 4,
  },
  selectContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeight: {lineHeight: 25},
  cardContainer: {marginVertical: 10, flexDirection: 'row'},
  imageCard: {
    width: 100,
    height: 88,
    resizeMode: 'cover',
    marginRight: 18,
    borderRadius: 10,
    backgroundColor: '#737373',
  },
  fontBold: {
    fontWeight: '600',
  },
  returned: {color: '#087e0d'},
  notReturned: {color: 'red'},
});
export default HistoryCard;
