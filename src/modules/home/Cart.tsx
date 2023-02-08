import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../utils/color';
import React, {useEffect, useState} from 'react';
import routesNames from '../../utils/routesNames';
import CustomButton from '../../custom/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {normalize, vh, vw} from '../../utils/dimensions';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId: any = '';
/**
 *
 * @Cart Componet
 * @description return UI and functionalty of Cart
 */
const Cart = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [isLoad, setIsLoad] = useState(false);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  /**
   *
   * @getCartItems Function
   * @description return cart Items
   */
  const getCartItems = async () => {
    setIsLoad(true);
    userId = await AsyncStorage.getItem('USERID');
    const user: any = await firestore().collection('users').doc(userId).get();
    setCartList(user._data?.cart);
    await setIsLoad(false);
  };

  /**
   *
   * @Cart Function
   * @description return  add more item
   */
  const addItem = async (item: any) => {
    const user: any = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data?.cart;
    tempDart.map((itm: any) => {
      if (itm.id == item?.id) {
        itm.data.qty = itm.data?.qty + 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  /**
   *
   * @Cart Function
   * @description return remove item or subract
   */
  const removeItem = async (item: any) => {
    const user: any = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data?.cart;
    tempDart.map((itm: any) => {
      if (itm.id == item?.id) {
        itm.data.qty = itm.data?.qty - 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };

  /**
   *
   * @Cart Function
   * @description return delete the item
   */
  const deleteItem = async (index: any) => {
    const user: any = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data?.cart;
    tempDart.splice(index, 1);
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };

  /**
   *
   * @Cart Function
   * @description return
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
   * @Cart Function
   * @description return
   */
  const _onPressRemoveItem = (item: any, index: any) => {
    if (item?.data?.qty > 1) {
      removeItem(item);
    } else {
      deleteItem(index);
    }
  };

  /**
   *
   * @Cart Function
   * @description return
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
        <View style={styles.addRemoveView}>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => {
              _onPressRemoveItem(item, index);
            }}>
            <Text style={styles.AddSubStyle}>{'-'}</Text>
          </TouchableOpacity>
          <Text style={styles.quantityTextStyle}>{item?.data?.qty}</Text>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => {
              addItem(item);
            }}>
            <Text style={styles.AddSubStyle}>{'+'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   *
   * @Cart Componet
   * @description return
   */
  const _ListEmptyComponent = () => {
    return (
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
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
        renderItem={_renderItem}
        ListEmptyComponent={_ListEmptyComponent}
        contentContainerStyle={{flex: 1}}
      />
      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              style={{height: vw(30), width: vw(30), marginRight: 10}}
              source={require('../../images/cart.png')}
            />
            <Text style={styles.checkOutTotalAmuontStyle}>
              {'Total Items (' + cartList.length + ')\nTotal : $ ' + getTotal()}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.addToCartBtn,
              {
                width: vh(100),
                height: vw(40),
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              navigation.navigate(routesNames.Order);
            }}>
            <Text style={{color: COLORS.WHITE}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    elevation: 4,
    width: '90%',
    height: vh(100),
    marginTop: vh(10),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: vh(10),
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: normalize(10),
  },
  itemImage: {
    width: vw(90),
    height: vw(90),
    margin: normalize(5),
    borderRadius: normalize(10),
  },
  nameView: {
    width: '30%',
    margin: normalize(10),
  },
  priceView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameText: {
    opacity: 0.7,
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
  addRemoveView: {
    marginLeft: vw(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartBtn: {
    width: vw(30),
    marginRight: vw(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(3),
    backgroundColor: COLORS.purple,
  },
  checkoutView: {
    bottom: 0,
    elevation: 5,
    width: '100%',
    height: vh(60),
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  AddSubStyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: normalize(20),
  },
  listEmptyContainerStyle: {
    flex: 1,
    marginBottom: vh(150),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  listEmptyTextStyle: {
    color: 'black',
    fontWeight: '500',
    marginLeft: vw(20),
    textAlign: 'center',
    fontSize: normalize(20),
  },
  checkOutTotalAmuontStyle: {
    color: '#000',
    fontWeight: '600',
  },
  quantityTextStyle: {
    right: vw(7),
    fontWeight: '600',
    color: COLORS.BLACK,
    fontSize: normalize(16),
  },
});
