/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

import {RadioButton} from 'react-native-paper';
import {getTransaction} from '../../utils/https/transactions';
import {useSelector} from 'react-redux';
import HistoryCard from '../../components/HistoryCard/HistoryCard';

const History = props => {
  const [selected, setSelected] = useState('');
  const [historyData, setHistoryData] = useState([]);

  const authInfo = useSelector(state => state.auth.authInfo);
  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    const params =
      authInfo.authLevel === 3
        ? {user_id: authInfo.user_id}
        : {owner_id: authInfo.user_id};
    getTransaction(params, token).then(data => {
      setHistoryData(data.data.result.data);
    });
  }, []);
  const currentDate = new Date().getTime();

  return (
    <View style={styles.container}>
      <ScrollView>
        <RadioButton.Group
          onValueChange={newValue => setSelected(newValue)}
          value={selected}>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.timeStamp}>Today</Text>
            </View>
            <View style={styles.selectContainer}>
              <Text style={styles.timeStamp}>Select</Text>
            </View>
          </View>
          {historyData?.map(data => {
            if (
              new Date(data.time_posted).getTime() -
                currentDate +
                1 * 24 * 60 * 60 * 1000 >
              0
            ) {
              return (
                <HistoryCard
                  key={data.id}
                  id={data.id}
                  vehicleName={data.model}
                  rentStart={new Date(data.rent_start_date)}
                  rentFinish={new Date(data.rent_finish_date)}
                  price={data.prepayment}
                  returned={data.returned_status}
                  userPaid={data.user_paid_status}
                  sellerPaid={data.seller_paid_status}
                  vehiclePic={data.picture}
                  authLevel={authInfo.authLevel}
                  amountRented={data.amount_rented}
                  idCard={data.id_card}
                  {...props}
                />
              );
            }
          })}
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.timeStamp}>A week ago</Text>
            </View>
            <View style={styles.selectContainer}>
              <Text style={styles.timeStamp}>Select</Text>
            </View>
          </View>
          {historyData?.map(data => {
            if (
              new Date(data.time_posted).getTime() -
                currentDate +
                7 * 24 * 60 * 60 * 1000 >
                0 &&
              new Date(data.time_posted).getTime() -
                currentDate +
                1 * 24 * 60 * 60 * 1000 <
                0
            ) {
              return (
                <HistoryCard
                  key={data.id}
                  id={data.id}
                  vehicleName={data.model}
                  rentStart={new Date(data.rent_start_date)}
                  rentFinish={new Date(data.rent_finish_date)}
                  price={data.prepayment}
                  returned={data.returned_status}
                  userPaid={data.user_paid_status}
                  sellerPaid={data.seller_paid_status}
                  authLevel={authInfo.authLevel}
                  amountRented={data.amount_rented}
                  idCard={data.id_card}
                  vehiclePic={data.picture}
                  {...props}
                />
              );
            }
          })}
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.timeStamp}>More than a week ago</Text>
            </View>
            <View style={styles.selectContainer}>
              <Text style={styles.timeStamp}>Select</Text>
            </View>
          </View>
          {historyData?.map(data => {
            if (
              new Date(data.time_posted).getTime() -
                currentDate +
                7 * 24 * 60 * 60 * 1000 <
              0
            ) {
              return (
                <HistoryCard
                  key={data.id}
                  id={data.id}
                  vehicleName={data.model}
                  rentStart={new Date(data.rent_start_date)}
                  rentFinish={new Date(data.rent_finish_date)}
                  price={data.prepayment}
                  returned={data.returned_status}
                  userPaid={data.user_paid_status}
                  sellerPaid={data.seller_paid_status}
                  amountRented={data.amount_rented}
                  authLevel={authInfo.authLevel}
                  idCard={data.id_card}
                  {...props}
                  vehiclePic={data.picture}
                />
              );
            }
          })}
        </RadioButton.Group>
      </ScrollView>
    </View>
  );
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

export default History;
