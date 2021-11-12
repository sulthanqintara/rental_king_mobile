import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './FilterStyle';
import {Modal, Portal, Provider} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Filter = props => {
  const passedData = props.route.params;
  const [locationVisible, setLocationVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);

  const [location, setLocation] = useState(
    passedData.location ? passedData.location : null,
  );
  const [rating, setRating] = useState(
    passedData.rating ? passedData.rating : null,
  );
  const [minPrice, setMinPrice] = useState(
    passedData.minPrice ? passedData.minPrice : null,
  );
  const [maxPrice, setMaxPrice] = useState(
    passedData.maxPrice ? passedData.maxPrice : null,
  );
  const [date, setDate] = useState(passedData.date ? passedData.date : false);
  const [type, setType] = useState(passedData.type ? passedData.type : null);
  const [sort, setSort] = useState(passedData.sort ? passedData.sort : null);

  const showLocation = () => setLocationVisible(true);
  const hideLocation = () => setLocationVisible(false);
  const showRating = () => setRatingVisible(true);
  const hideRating = () => setRatingVisible(false);
  const showPrice = () => setPriceVisible(true);
  const hidePrice = () => setPriceVisible(false);
  const showDate = () => setDateVisible(true);
  const hideDate = () => setDateVisible(false);
  const showType = () => setTypeVisible(true);
  const hideType = () => setTypeVisible(false);
  const showSort = () => setSortVisible(true);
  const hideSort = () => setSortVisible(false);
  const reset = () => {
    setLocation(null);
    setRating(null);
    setMinPrice(null);
    setMaxPrice(null);
    setDate(false);
    setType(null);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={[styles.flexRow, styles.alignItemsCenter]}>
          <Pressable
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Ionicons name="chevron-back" size={28} />
          </Pressable>
          <Text style={[styles.bigTxt, styles.headerTitle]}>Filter</Text>
          <Pressable style={styles.reset} onPress={reset}>
            <Text style={styles.MediumTxt}>Reset</Text>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Pressable
            style={[styles.flexRow, styles.alignItemsCenter]}
            onPress={showLocation}>
            <Text style={[styles.MediumTxt, styles.filterTitle]}>
              Your Location
            </Text>
            <Text style={[styles.MediumGreyTxt, styles.filterButtons]}>
              {location ? location : 'Select'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          <Pressable
            style={[styles.flexRow, styles.alignItemsCenter]}
            onPress={showRating}>
            <Text style={[styles.MediumTxt, styles.filterTitle]}>
              Star Rating
            </Text>
            <Text style={[styles.MediumGreyTxt, styles.filterButtons]}>
              {rating ? rating : 'Select'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          <Pressable
            style={[styles.flexRow, styles.alignItemsCenter]}
            onPress={showPrice}>
            <Text style={[styles.MediumTxt, styles.filterTitle]}>Price</Text>
            <Text style={[styles.MediumGreyTxt, styles.filterButtons]}>
              {maxPrice ? '' : '≥ '}
              {minPrice === 0 ? '0' : ''}
              {minPrice ? minPrice : ''} {maxPrice ? '-' : ''}{' '}
              {maxPrice ? maxPrice : ''}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          <Pressable
            style={[styles.flexRow, styles.alignItemsCenter]}
            onPress={showDate}>
            <Text style={[styles.MediumTxt, styles.filterTitle]}>Date</Text>
            <Text style={[styles.MediumGreyTxt, styles.filterButtons]}>
              {typeof date === 'object' ? date.toLocaleDateString() : 'Select'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          {/* <DatePicker
            modal
            mode="date"
            open={dateVisible}
            date={typeof date === 'object' ? date : new Date()}
            onConfirm={pickedDate => {
              hideDate();
              setDate(pickedDate);
            }}
            onCancel={() => {
              hideDate();
            }}
          /> */}
          <DateTimePickerModal
            isVisible={dateVisible}
            mode="date"
            date={typeof date === 'object' ? date : new Date()}
            onConfirm={date => {
              hideDate();
              setDate(pickedDate);
            }}
            onCancel={() => {
              hideDate();
            }}
          />
          <Pressable
            style={[styles.flexRow, styles.alignItemsCenter]}
            onPress={showType}>
            <Text style={[styles.MediumTxt, styles.filterTitle]}>Type</Text>
            <Text style={[styles.MediumGreyTxt, styles.filterButtons]}>
              {type === 1 && 'Car'}
              {type === 2 && 'Motorcycle'}
              {type === 3 && 'Bicycle'}
              {!type && 'Select'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          <Pressable
            style={[styles.flexRow, styles.alignItemsCenter]}
            onPress={showSort}>
            <Text style={[styles.MediumTxt, styles.filterTitle]}>Sort by</Text>
            <Text style={[styles.MediumGreyTxt, styles.filterButtons]}>
              {sort === 1 && 'Highest Price'}
              {sort === 2 && 'Lowest Price'}
              {sort === 3 && 'A to Z'}
              {sort === 4 && 'Z to A'}
              {!sort && 'Select'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          <Portal>
            <Modal
              visible={locationVisible}
              onDismiss={hideLocation}
              contentContainerStyle={styles.modal}>
              <Pressable
                onPress={() => {
                  hideLocation();
                  setLocation('Kalimantan');
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Kalimantan</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideLocation();
                  setLocation('Malang');
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Malang</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideLocation();
                  setLocation('South Jakarta');
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>South Jakarta</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideLocation();
                  setLocation('Yogyakarta');
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Yogyakarta</Text>
              </Pressable>
            </Modal>
            <Modal
              visible={ratingVisible}
              onDismiss={hideRating}
              contentContainerStyle={styles.modal}>
              <Pressable
                onPress={() => {
                  hideRating();
                  setRating('DESC');
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Sort by highest rating</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideRating();
                  setRating('ASC');
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Sort by lowest rating</Text>
              </Pressable>
            </Modal>
            <Modal
              visible={priceVisible}
              onDismiss={hidePrice}
              contentContainerStyle={styles.modal}>
              <Pressable
                onPress={() => {
                  hidePrice();
                  setMinPrice(0);
                  setMaxPrice(50 * 1000);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Rp. 0 - Rp. 50.000</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hidePrice();
                  setMinPrice(50 * 1000);
                  setMaxPrice(100 * 1000);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>
                  Rp. 50.000 - Rp. 100.000
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hidePrice();
                  setMinPrice(100 * 1000);
                  setMaxPrice(250 * 1000);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>
                  Rp. 100.000 - Rp. 250.000
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hidePrice();
                  setMinPrice(250 * 1000);
                  setMaxPrice(500 * 1000);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>
                  Rp. 250.000 - Rp. 500.000
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hidePrice();
                  setMinPrice(500 * 1000);
                  setMaxPrice(1000 * 1000);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>
                  Rp. 500.000 - Rp. 1.000.000
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hidePrice();
                  setMinPrice(1000 * 1000);
                  setMaxPrice(0);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>≥ Rp. 1.000.000</Text>
              </Pressable>
            </Modal>
            <Modal
              visible={typeVisible}
              onDismiss={hideType}
              contentContainerStyle={styles.modal}>
              <Pressable
                onPress={() => {
                  hideType();
                  setType(1);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Car</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideType();
                  setType(2);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Motorcycle</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideType();
                  setType(3);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Bicycle</Text>
              </Pressable>
            </Modal>
            <Modal
              visible={sortVisible}
              onDismiss={hideSort}
              contentContainerStyle={styles.modal}>
              <Pressable
                onPress={() => {
                  hideSort();
                  setSort(1);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Highest Price</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideSort();
                  setSort(2);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Lowest Price</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideSort();
                  setSort(3);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>A to Z</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  hideSort();
                  setSort(4);
                }}
                style={styles.selection}>
                <Text style={styles.selectionTxt}>Z to A</Text>
              </Pressable>
            </Modal>
          </Portal>
        </View>
        <Pressable
          style={styles.apply}
          onPress={() => {
            props.navigation.navigate('Search', {
              location,
              rating,
              minPrice,
              maxPrice,
              date,
              type,
              keyword: passedData.keyword,
              sort,
            });
          }}>
          <Text style={[styles.bigTxt, styles.applyTxt]}>Apply</Text>
        </Pressable>
      </View>
    </Provider>
  );
};

export default Filter;
