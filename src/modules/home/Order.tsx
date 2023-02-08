import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DesignHeight,
  DesignWidth,
  normalize,
  vh,
  vw,
} from '../../utils/dimensions';
import COLORS from '../../utils/color';
import React, {useEffect, useState} from 'react';
import routesNames from '../../utils/routesNames';
import RazorpayCheckout from 'react-native-razorpay';
import CustomButton from '../../custom/CustomButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let userId: any = '';

/**
 *
 * @Checkout Componet
 * @description return UI and functionalty of Payment
 */
const Checkout = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [isLoad, setIsLoad] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [delirvirySelect, setdelirvirySelect] = useState(false);

  useEffect(() => {
    getCartItems();
    // getAddressList();
  }, [isFocused]);

  /**
   *
   * @getCartItems function
   * @description return cartItem on the Ui
   */
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user: any = await firestore().collection('users').doc(userId).get();
    setCartList(user?._data?.cart);
  };

  /**
   *
   * @getTotal function
   * @description return Total amount of Items to deliver
   */
  const getTotal = () => {
    let total = 0;
    cartList.map((item: any) => {
      total = total + item?.data?.qty * item?.data?.discountPrice;
    });
    return total;
  };

  /**
   *
   * @toggleDelivery function
   * @description return the boolen vaue for devilvery or PickUp
   */

  const toggleDelivery = () => {
    setdelirvirySelect(!delirvirySelect);
  };

  /**
   *
   * @PayNow function
   * @description return the Payement method of razorPay
   */
  const PayNow = async () => {
    const name = await AsyncStorage.getItem('NAME');
    const email = await AsyncStorage.getItem('EMAIL');
    const mobile = await AsyncStorage.getItem('MOBILE');
    const userId = await AsyncStorage.getItem('USERID');

    const amt = getTotal() * 82;
    var options: any = {
      description: 'Credits towards Food App Inc.',
      image: require('../../images/logo.png'),
      currency: 'INR',
      key: 'rzp_test_I0jaUf6NcXxqCP',
      amount: amt * 82,
      name: 'Food App',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: email,
        contact: mobile,
        name: name,
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        navigation.navigate('OrderStatus', {
          status: 'success',
          paymentId: data?.razorpay_payment_id,
          cartList: cartList,
          total: amt,
          address: 'B-25 , Sector-58 , Noida-Up',
          userId: userId,
          userName: name,
          userEmail: email,
          userMobile: mobile,
        });
      })
      .catch(error => {
        // handle failure
        console.log('hhkk>>>', error);
        navigation.navigate('OrderStatus', {
          status: 'failed',
        });
      });
  };

  /**
   *
   * @_renderItem function
   * @description return Ui to the Flatlist  on Screen
   */
  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.itemView}>
        <Image source={{uri: item?.data?.imageUrl}} style={styles.itemImage} />
        <View style={styles.nameView}>
          <Text style={styles.nameText}>{item?.data?.name}</Text>
          <Text style={styles.descText}>{item?.data?.description}</Text>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>
              {'$' + item?.data?.discountPrice}
            </Text>
            <Text style={styles.discountText}>{'$' + item?.data?.price}</Text>
          </View>
        </View>
        <Text style={styles.nameText}>{'Qty : ' + item?.data?.qty}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList data={cartList} renderItem={_renderItem} />
      </View>
      {cartList.length > 0 ? (
        <View>
          <View style={styles.totalView}>
            <Text style={styles.nameText}>{'Total'}</Text>
            <Text style={styles.nameText}>{'$' + getTotal()}</Text>
          </View>
          <Text style={[styles.nameText, {marginLeft: vw(40)}]}>
            {'Delivered Method'}
          </Text>
          <View style={styles.DevilveryViewStyle}>
            <TouchableOpacity
              onPress={toggleDelivery}
              style={{flexDirection: 'row'}}>
              {!delirvirySelect ? (
                <Image
                  resizeMode="contain"
                  style={styles.selectImageStyle}
                  source={require('../../images/selected.png')}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  style={styles.unselectImageStyle}
                  source={require('../../images/dryClean.png')}
                />
              )}
              <Text style={styles.textColor}>{'Door deleviry'}</Text>
            </TouchableOpacity>

            <View style={styles.borderBottomWidthStyle} />
            <TouchableOpacity
              onPress={toggleDelivery}
              style={{flexDirection: 'row'}}>
              {delirvirySelect ? (
                <Image
                  resizeMode="contain"
                  style={styles.selectImageStyle}
                  source={require('../../images/selected.png')}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  style={styles.unselectImageStyle}
                  source={require('../../images/dryClean.png')}
                />
              )}
              <Text style={styles.textColor}>{'Pick Up'}</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            customButtonStyle={styles.checkoutBtn}
            buttonText={'Proceed to payment'}
            onPress={PayNow}
          />
        </View>
      ) : (
        <View style={styles.listEmptyContainerStyle}>
          <Image
            style={{height: vw(130), width: vw(130), alignSelf: 'center'}}
            source={require('../../images/cart.png')}
          />
          <Text style={styles.listEmptyTextStyle}>{'No orders yet'}</Text>
          <Text style={{textAlign: 'center', marginLeft: vw(20)}}>
            {'Hit the purple Button down\nbelow to Create an order'}
          </Text>
          <CustomButton
            onPress={() => navigation.navigate(routesNames.HomeScreen)}
            buttonText="Start ordering"
          />
        </View>
      )}
      {isLoad && (
        <ActivityIndicator style={styles.indicatorStyle} size={'large'} />
      )}
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    width: '90%',
    elevation: 4,
    height: vh(100),
    marginTop: vh(10),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(10),
    borderRadius: vh(10),
    backgroundColor: COLORS.WHITE,
  },
  itemImage: {
    margin: 5,
    width: vw(90),
    height: vw(90),
    borderRadius: vh(10),
  },
  nameView: {
    width: '35%',
    margin: vh(10),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: '700',
    color: COLORS.BLACK,
    fontSize: normalize(18),
  },
  descText: {
    fontWeight: '600',
    fontSize: normalize(14),
  },
  priceText: {
    color: 'green',
    fontWeight: '700',
    fontSize: normalize(18),
  },
  discountText: {
    marginLeft: 5,
    fontWeight: '600',
    fontSize: normalize(17),
    textDecorationLine: 'line-through',
  },
  totalView: {
    height: vh(50),
    marginTop: vh(20),
    paddingLeft: vh(20),
    borderTopWidth: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: vh(20),
    marginHorizontal: vw(20),
    justifyContent: 'space-between',
    borderTopColor: COLORS.shade_grey,
  },
  editAddress: {
    color: '#2F62D1',
    fontSize: normalize(16),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  borderBottomWidthStyle: {
    opacity: 0.3,
    borderBottomWidth: 1,
    marginVertical: vh(10),
    marginHorizontal: vw(20),
  },
  checkoutBtn: {
    marginHorizontal: vw(40),
    borderRadius: normalize(10),
  },
  textColor: {
    color: COLORS.BLACK,
    marginLeft: vw(10),
  },
  DevilveryViewStyle: {
    padding: vw(20),
    marginTop: vh(10),
    borderRadius: vw(20),
    marginHorizontal: vw(30),
    backgroundColor: COLORS.WHITE,
  },
  selectImageStyle: {
    height: vw(18),
    width: vw(18),
  },
  unselectImageStyle: {
    height: vw(16),
    width: vw(16),
  },
  listEmptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: vh(150),
  },
  listEmptyTextStyle: {
    fontWeight: '500',
    marginLeft: vw(20),
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: normalize(20),
  },
  indicatorStyle: {
    zIndex: 1,
    width: DesignWidth,
    position: 'absolute',
    height: DesignHeight / 2,
  },
});
