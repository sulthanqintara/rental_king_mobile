import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {logoutAction} from '../../redux/actionCreators/auth';
import {connect, useSelector} from 'react-redux';

import styles from './HomeContainerStyle';
import headerImage from '../../assets/img/home.jpg';
import HomeCard from '../../components/HomeCard/HomeCard';
import {getVehicles} from '../../utils/https/vehicles';

const HomeContainer = props => {
  const [popularVehicle, setPopularVehicle] = useState([]);
  const [motorcycleData, setMotorcycleData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [bikeData, setBikeData] = useState([]);

  const getPopularVehicleHandler = () => {
    let params = {order_by: 'v.popular_stats', sort: 'DESC', limit: '4'};
    getVehicles(params).then(data => {
      setPopularVehicle(data.data.result.data);
    });
  };
  const getPopularCar = () => {
    let params = {
      order_by: 'v.popular_stats',
      sort: 'DESC',
      limit: '4',
      filter_by_type: 1,
    };
    getVehicles(params).then(data => {
      setCarData(data.data.result.data);
    });
  };
  const getPopularMotorCycle = () => {
    let params = {
      order_by: 'v.popular_stats',
      sort: 'DESC',
      limit: '4',
      filter_by_type: 2,
    };
    getVehicles(params).then(data => {
      setMotorcycleData(data.data.result.data);
    });
  };
  const getPopularBike = () => {
    let params = {
      order_by: 'v.popular_stats',
      sort: 'DESC',
      limit: '4',
      filter_by_type: 3,
    };
    getVehicles(params).then(data => {
      setBikeData(data.data.result.data);
    });
  };
  const auth = useSelector(reduxState => reduxState.auth.authInfo);

  useEffect(() => {
    getPopularVehicleHandler();
    getPopularMotorCycle();
    getPopularCar();
    getPopularBike();
  }, []);
  return (
    <ScrollView>
      <View>
        <Image style={styles.headerImage} source={headerImage} />
      </View>
      <View style={styles.titleContainer}>
        {auth.authLevel !== 3 && (
          <Pressable
            onPress={() => {
              props.navigation.navigate('AddItem');
            }}
            style={styles.addBtn}>
            <Text style={styles.addTxt}>+</Text>
          </Pressable>
        )}
        <Text style={styles.titleText}>Recommended</Text>
        <Pressable
          onPress={() => {
            props.navigation.navigate('ViewMore', {type: 'popular'});
          }}>
          <Text style={styles.viewMore}>View More ></Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {popularVehicle?.map((vehicle, idx) => {
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
        {auth.authLevel !== 3 && (
          <Pressable
            onPress={() => {
              props.navigation.navigate('AddItem');
            }}
            style={styles.addBtn}>
            <Text style={styles.addTxt}>+</Text>
          </Pressable>
        )}
        <Text style={styles.titleText}>Motorcycle</Text>
        <Pressable
          onPress={() => {
            props.navigation.navigate('ViewMore', {type: 'motorcycle'});
          }}>
          <Text style={styles.viewMore}>View More ></Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.cardContainer}>
        {motorcycleData?.map((vehicle, idx) => {
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
        {auth.authLevel !== 3 && (
          <Pressable
            onPress={() => {
              props.navigation.navigate('AddItem');
            }}
            style={styles.addBtn}>
            <Text style={styles.addTxt}>+</Text>
          </Pressable>
        )}
        <Text style={styles.titleText}>Car</Text>
        <Pressable
          onPress={() => {
            props.navigation.navigate('ViewMore', {type: 'car'});
          }}>
          <Text style={styles.viewMore}>View More ></Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {carData?.map((vehicle, idx) => {
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
        {auth.authLevel !== 3 && (
          <Pressable
            onPress={() => {
              props.navigation.navigate('AddItem');
            }}
            style={styles.addBtn}>
            <Text style={styles.addTxt}>+</Text>
          </Pressable>
        )}
        <Text style={styles.titleText}>Bike</Text>
        <Pressable
          onPress={() => {
            props.navigation.navigate('ViewMore', {type: 'bike'});
          }}>
          <Text style={styles.viewMore}>View More ></Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {bikeData?.map((vehicle, idx) => {
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
