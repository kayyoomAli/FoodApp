// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import RazorpayCheckout from 'react-native-razorpay';
// import {vw} from '../../utils/dimensions';
// let userId: any = '';
// const Checkout = () => {
//   const isFocused = useIsFocused();
//   const navigation = useNavigation<any>();
//   const [cartList, setCartList] = useState([]);
//   // const [selectedAddress, setSelectedAddress] = useState('No Selected Address');
//   useEffect(() => {
//     getCartItems();
//     // getAddressList();
//   }, [isFocused]);
//   const getCartItems = async () => {
//     userId = await AsyncStorage.getItem('USERID');
//     const user: any = await firestore().collection('users').doc(userId).get();
//     setCartList(user?._data?.cart);
//   };

//   const getTotal = () => {
//     let total = 0;
//     cartList.map((item: any) => {
//       total = total + item?.data?.qty * item?.data?.discountPrice;
//     });
//     return total;
//   };
//   // const _payNow = async () => {

//   //    options: any = {
//   //     description: 'Credits towards consultation',
//   //     image: require('../../images/logo.png'),
//   //     currency: 'INR',
//   //     key: 'rzp_test_I0jaUf6NcXxqCP',
//   //     amount: getTotal() * 100,
//   //     name: 'Food App',
//   //     order_id: '', //Replace this with an order_id created using Orders API.
//   //     prefill: {
//   //       email: email,
//   //       contact: mobile,
//   //       name: name,
//   //     },
//   //     theme: {color: '#EC9912'},
//   //   };
//   //   RazorpayCheckout.open(options)
//   //     .then(data => {
//   //       // handle success
//   //       navigation.navigate('OrderStatus', {
//   //         status: 'success',
//   //         paymentId: data?.razorpay_payment_id,
//   //         cartList: cartList,
//   //         total: getTotal(),
//   //         address: selectedAddress,
//   //         userId: userId,
//   //         userName: name,
//   //         userEmail: email,
//   //         userMobile: mobile,
//   //       });
//   //     })
//   //     .catch(error => {
//   //       // handle failure
//   //       console.log('hhkk>>>', error);
//   //       navigation.navigate('OrderStatus', {
//   //         status: 'failed',
//   //       });
//   //     });
//   // };
//   const PayNow = async () => {
//     const email = await AsyncStorage.getItem('EMAIL');
//     const name = await AsyncStorage.getItem('NAME');
//     const mobile = await AsyncStorage.getItem('MOBILE');
//     const userId = await AsyncStorage.getItem('USERID');
//     var options: any = {
//       description: 'Credits towards Food App Inc.',
//       image: require('../../images/logo.png'),
//       currency: 'INR',
//       key: 'rzp_test_I0jaUf6NcXxqCP',
//       amount: getTotal() * 100,
//       name: 'Food App',
//       order_id: '', //Replace this with an order_id created using Orders API.
//       prefill: {
//         email: email,
//         contact: mobile,
//         name: name,
//       },
//       theme: {color: '#53a20e'},
//     };
//     RazorpayCheckout.open(options);
//     RazorpayCheckout.open(options)
//       .then(data => {
//         // handle success
//         navigation.navigate('OrderStatus', {
//           status: 'success',
//           paymentId: data?.razorpay_payment_id,
//           cartList: cartList,
//           total: getTotal(),
//           address: 'B-25 , Sector-58 , Noida-Up',
//           userId: userId,
//           userName: name,
//           userEmail: email,
//           userMobile: mobile,
//         });
//       })
//       .catch(error => {
//         // handle failure
//         console.log('hhkk>>>', error);
//         navigation.navigate('OrderStatus', {
//           status: 'failed',
//         });
//       });
//   };
//   return (
//     <View style={styles.container}>
//       <View>
//         <FlatList
//           data={cartList}
//           renderItem={({item, index}: any) => {
//             return (
//               <View style={styles.itemView}>
//                 <Image
//                   source={{uri: item?.data?.imageUrl}}
//                   style={styles.itemImage}
//                 />
//                 <View style={styles.nameView}>
//                   <Text style={styles.nameText}>{item?.data?.name}</Text>
//                   <Text style={styles.descText}>{item?.data?.description}</Text>
//                   <View style={styles.priceView}>
//                     <Text style={styles.priceText}>
//                       {'$' + item?.data?.discountPrice}
//                     </Text>
//                     <Text style={styles.discountText}>
//                       {'$' + item?.data?.price}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text style={styles.nameText}>
//                   {'Qty : ' + item?.data?.qty}
//                 </Text>
//               </View>
//             );
//           }}
//         />
//       </View>
//       <View style={styles.totalView}>
//         <Text style={styles.nameText}>{'Total'}</Text>
//         <Text style={styles.nameText}>{'$' + getTotal()}</Text>
//       </View>

//       <Text style={[styles.nameText, {marginLeft: vw(20)}]}>
//         {'Delivered Here.'}
//       </Text>
//       <Text style={{marginLeft: vw(20)}}>{'B-25 , Sector-58 , Noida-Up'}</Text>
//       <TouchableOpacity style={[styles.checkoutBtn]} onPress={PayNow}>
//         <Text style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
//           {'Pay Now'} {'$' + getTotal()}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Checkout;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemView: {
//     flexDirection: 'row',
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     elevation: 4,
//     marginTop: 10,
//     borderRadius: 10,
//     height: 100,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   itemImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 10,
//     margin: 5,
//   },
//   nameView: {
//     width: '35%',
//     margin: 10,
//   },
//   priceView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   nameText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: 'black',
//     // marginLeft: vw(20),
//   },
//   descText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   priceText: {
//     fontSize: 18,
//     color: 'green',
//     fontWeight: '700',
//   },
//   discountText: {
//     fontSize: 17,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//     marginLeft: 5,
//   },
//   totalView: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//     paddingLeft: 20,
//     height: 50,
//     borderTopWidth: 0.3,
//     paddingRight: 20,
//     marginTop: 20,
//     alignItems: 'center',
//     borderTopColor: '#8e8e8e',
//   },
//   editAddress: {
//     color: '#2F62D1',
//     fontSize: 16,
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
//   checkoutBtn: {
//     width: '90%',
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: 'green',
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
import React from 'react';
import COLORS from '../../utils/color';
import CustomButton from '../../custom/CustomButton';
import {normalize, vh, vw} from '../../utils/dimensions';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {localeImage} from '../../utils/localeImages';
/**
 * @DataList array
 * @description return the data to the map to render in UI
 */
const DataList = [
  {
    id: '1',
    title: 'Orders',
  },
  {
    id: '2',
    title: 'Pending reviews',
  },

  {
    id: '3',
    title: 'FAQ',
  },

  {
    id: '4',
    title: 'Help',
  },
];

/**
 * @MyProfile Component
 * @description return UI of MyProfile in Screen
 */

const Settings = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const {AdminEmail} = useSelector((store: any) => store.AuthenticateReducer);

  /**
   * @checkLogOut Function
   * @description return the logout and set payload empty to Admin_data
   */
  const checkLogOut = async () => {
    // const email: any = await AsyncStorage.removeItem('EMAIL');
    await dispatch({type: 'Admin_Data', payload: ''});
    // console.log(AdminEmail);
    navigation.navigate('UserLogin');
  };
  return (
    <View style={styles.mainConatiner}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.MyProfileTextStyle}>{'Hello,\nKayyoom Ali'}</Text>
        {/* <CustomButton /> */}
        <TouchableOpacity onPress={checkLogOut} activeOpacity={0.7}>
          <Image style={styles.logOutStyle} source={localeImage.shoutdown} />
        </TouchableOpacity>
      </View>
      <Text style={styles.PesonalTextStyle}>{'Personal details'}</Text>
      <View style={styles.personalDetailsViewStyle}>
        <Image
          style={styles.profileImageStyle}
          source={require('../../images/profile_fill.png')}
        />
        <View style={{marginHorizontal: 15}}>
          <Text style={styles.textColor}>{'kayyoom ALi'}</Text>
          <Text>{'Ali@gmail.com'}</Text>
          <Text>{'+91 99899800788'}</Text>
          <View style={styles.borderBottomWidthStyle} />
          <Text
            numberOfLines={3}
            style={{textAlign: 'justify', maxWidth: vw(200)}}>
            {'B-25 Nr Thomson Reuters, Sector 58, Noida, Uttar Pradesh 201301'}
          </Text>
        </View>
      </View>
      {DataList.map((item: any, index: any) => {
        return (
          <TouchableOpacity
            key={item?.id}
            activeOpacity={0.7}
            style={styles.renderViewMapStyle}>
            <Text style={styles.renderTextColor}>{item.title}</Text>
            <Text style={styles.renderTextColor}>{'>'}</Text>
          </TouchableOpacity>
        );
      })}
      <CustomButton
        buttonText="Update"
        customButtonStyle={styles.customButtonStyle}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    marginHorizontal: vw(34),
  },
  MyProfileTextStyle: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontSize: normalize(18),
    marginVertical: vh(20),
  },
  PesonalTextStyle: {
    fontSize: normalize(16),
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: vh(10),
    marginLeft: vw(5),
  },
  personalDetailsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    padding: 5,
    paddingVertical: vh(30),
    marginBottom: vh(20),
  },
  profileImageStyle: {
    height: vw(80),
    width: vw(80),
    marginLeft: vw(10),
    tintColor: COLORS.purple,
  },
  textColor: {
    color: COLORS.BLACK,
  },
  renderViewMapStyle: {
    backgroundColor: 'white',
    paddingHorizontal: vw(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: vh(10),
    paddingVertical: vw(20),
    borderRadius: vw(20),
  },
  renderTextColor: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  customButtonStyle: {
    marginHorizontal: 0,
    borderRadius: normalize(20),
    marginTop: vh(40),
  },
  borderBottomWidthStyle: {
    borderBottomWidth: 1,
    marginVertical: vh(10),
    opacity: 0.3,
  },
  logOutStyle: {height: vw(30), width: vw(30)},
});
