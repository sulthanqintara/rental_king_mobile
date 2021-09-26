import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

const History = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.timeStamp}>Today</Text>
            <Text>
              Please Finish your payment for vespa for Vespa Rental Jogja
            </Text>
          </View>
          <View style={styles.selectContainer}>
            <Text style={styles.timeStamp}>Select</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const d = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: 'white', flex: 1},
  contentContainer: {flexDirection: 'row'},
  timeStamp: {color: '#C4C4C4', textAlign: 'center'},
  select: {flex: 1},
  leftContainer: {
    width: (d.width * 3) / 4,
  },
  selectContainer: {
    flex: 1,
  },
});

export default History;
