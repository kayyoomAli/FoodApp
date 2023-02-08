import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {normalize, vh, vw} from '../../utils/dimensions';
const Address = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [addressList, setAddressList] = useState([]);
  // const [selectedAddress, setSelectedAddress] = useState('');
  useEffect(() => {
    getAddressList();
  }, [isFocused]);
  /**
   * @getAddressList Function
   * @description getting Adress list of User
   */
  const getAddressList = async () => {
    const userId: any = await AsyncStorage.getItem('USERID');
    const addressId: any = await AsyncStorage.getItem('ADDRESS');
    const user: any = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.map((item: any) => {
      if (item.addressId == addressId) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setAddressList(tempDart);
  };
  /**
   *
   * @saveDeafultAddress Function
   * @description setting the Adress
   */
  const saveDeafultAddress = async (item: any) => {
    await AsyncStorage.setItem('ADDRESS', item?.addressId);
    let tempDart = [];
    tempDart = addressList;
    tempDart.map((itm: any) => {
      if (itm.addressId == item?.addressId) {
        itm.selected = true;
      } else {
        itm.selected = false;
      }
    });

    let temp: any = [];

    tempDart.map((item: any) => {
      temp.push(item);
    });
    setAddressList(temp);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={({item, index}: any) => {
          return (
            <View
              style={[
                styles.addressItem,
                {marginBottom: index == addressList.length - 1 ? 100 : 10},
              ]}>
              <View>
                <Text>{'Street: ' + item?.street}</Text>
                <Text>{'City: ' + item?.city}</Text>
                <Text>{'Pincode: ' + item?.pincode}</Text>
                <Text>{'Mobile: ' + item?.mobile}</Text>
              </View>
              {item?.selected == true ? (
                <Text>default</Text>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    saveDeafultAddress(item);
                  }}>
                  <Text style={{color: '#fff'}}>Set Default</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddNewAddress');
        }}>
        <Text style={styles.btnText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(10),
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: normalize(10),
  },
  btnText: {
    color: '#000',
    fontWeight: '600',
    fontSize: normalize(16),
  },
  addressItem: {
    elevation: 4,
    width: '90%',
    padding: vh(20),
    alignSelf: 'center',
    marginTop: vh(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  btn: {
    width: vw(100),
    height: vh(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
