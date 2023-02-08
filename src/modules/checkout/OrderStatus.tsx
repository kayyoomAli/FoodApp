import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CustomButton from '../../custom/CustomButton';
import {normalize, vh} from '../../utils/dimensions';
import COLORS from '../../utils/color';
const OrderStatus = ({navigation}: any) => {
  const route = useRoute<any>();
  console.log('ffff', route?.params);
  useEffect(() => {
    if (route?.params?.status == 'success') {
      placeOrder();
    }
  }, []);
  const placeOrder = async () => {
    let tempOrders: any = [];
    let user: any = await firestore()
      .collection('users')
      .doc(route?.params?.userId)
      .get();
    tempOrders = user?._data?.orders;
    tempOrders.push({
      items: route?.params?.cartList,
      address: route?.params?.address,
      orderBy: route?.params?.userName,
      userEmail: route?.params?.userEmail,
      userMobile: route?.params?.userMobile,
      userId: route?.params?.userId,
      orderTotal: route?.params?.total,
      paymentId: route?.params?.paymentId,
    });
    firestore().collection('users').doc(route?.params?.userId).update({
      cart: [],
      orders: tempOrders,
    });
    firestore()
      .collection('orders')
      .add({
        data: {
          items: route?.params?.cartList,
          address: route?.params?.address,
          orderBy: route?.params?.userName,
          userEmail: route?.params?.userEmail,
          userMobile: route?.params?.userMobile,
          userId: route?.params?.userId,
          orderTotal: route?.params?.total,
          paymentId: route?.params?.paymentId,
        },
        orderBy: route?.params?.userId,
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={
          route?.params?.status == 'success'
            ? require('../../images/success.gif')
            : require('../../images/failed.gif')
        }
        style={styles.icon}
      />
      <Text style={styles.msgStyle}>
        {route?.params?.status == 'success'
          ? 'Order Placed Successfully !!'
          : 'Order Failed !!'}
      </Text>
      <CustomButton
        buttonText="Go To Home"
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      />
    </View>
  );
};

export default OrderStatus;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  icon: {
    width: '70%',
    height: '40%',
    alignSelf: 'center',
    borderColor: 'black',
  },
  msgStyle: {
    fontWeight: '600',
    marginTop: vh(-50),
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: normalize(20),
  },
  backToHome: {
    width: '50%',
    height: vh(50),
    borderWidth: 0.5,
    marginTop: vh(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
  },
});
