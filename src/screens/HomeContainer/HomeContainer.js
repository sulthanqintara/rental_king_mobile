import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {logoutAction} from '../../redux/actionCreators/auth';
import {getVehiclesAction} from '../../redux/actionCreators/vehicles';
import {connect} from 'react-redux';

import styles from './HomeContainerStyle';
import headerImage from '../../assets/img/home.jpg';
import HomeCard from '../../components/HomeCard/HomeCard';

const HomeContainer = props => {
  const getPopularVehicleHandler = () => {
    let params = {order_by: 'v.popular_stats', sort: 'DESC', limit: '4'};
    props.getVehicle(params);
  };
  useEffect(() => {
    getPopularVehicleHandler();
    console.log('asd');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.headerImage} source={headerImage} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Recommended</Text>
        <Pressable>
          <Text>View More ></Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.vehicle.vehicleData?.map((vehicle, idx) => {
          return (
            <HomeCard
              {...props}
              img={vehicle.picture.split(',')[0]}
              key={vehicle.id}
              id={vehicle.id}
            />
          );
        })}
      </ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Recommended</Text>
        <Pressable>
          <Text>View More ></Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.vehicle.vehicleData?.map((vehicle, idx) => {
          return (
            <HomeCard
              {...props}
              img={vehicle.picture.split(',')[0]}
              key={vehicle.id}
              id={vehicle.id}
            />
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

const mapStateToProps = ({auth, vehicle}) => {
  return {
    auth,
    vehicle,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: body => {
      dispatch(logoutAction(body));
    },
    getVehicle: params => {
      dispatch(getVehiclesAction(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
