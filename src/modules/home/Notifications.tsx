import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Notifications = () => {
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Dimensions,
//   View,
//   Image,
//   Text,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {SwiperFlatList} from 'react-native-swiper-flatlist';

// /**
//  * @Notifications Function
//  * @returns Notifications ui
//  */
// const Notifications = () => {
//   const [items, setItems] = useState([]);

//   const categoryData = [
//     {
//       id: 1,
//       image: require('../../images/cart.png'),
//       title: 'Meat',
//       color: 'tomato',
//     },
//     {
//       id: 2,
//       image: require('../../images/cart.png'),
//       title: 'Pizza',
//       color: 'thistle',
//     },
//     {
//       id: 3,
//       image: require('../../images/cart.png'),
//       title: 'Burgers',
//       color: 'skyblue',
//     },
//     {
//       id: 4,
//       image: require('../../images/cart.png'),
//       title: 'Noodels',
//       color: 'teal',
//     },
//     {
//       id: 5,
//       image: require('../../images/cart.png'),
//       title: 'Coldrinks',
//       color: 'orange',
//     },
//   ];
//   /**
//    * @returns the items to the uI as screen get render
//    */
//   useEffect(() => {
//     firestore()
//       .collection('items')
//       .get()
//       .then(querySnapshot => {
//         console.log('Total users: ', querySnapshot.size);
//         let tempData: any = [];
//         querySnapshot.forEach(documentSnapshot => {
//           console.log(
//             'User ID: ',
//             documentSnapshot.id,
//             documentSnapshot.data(),
//           );
//           tempData?.push({
//             id: documentSnapshot.id,
//             data: documentSnapshot.data(),
//           });
//         });
//         setItems(tempData);
//       });
//     // Stop listening for updates when no longer required
//     // return () => subscriber();
//   }, []);

//   /**
//    *
//    * @_renderCategoryItem Component
//    * @returns  View and Styling of Category Item
//    */
//   const _renderCategoryItem = ({item}: any) => {
//     return (
//       <TouchableOpacity
//         style={{
//           margin: 10,
//           alignItems: 'center',
//           borderWidth: 1,
//           height: 80,
//           width: 100,
//           borderRadius: 10,
//           backgroundColor: item?.color,
//         }}>
//         <Text>{item?.title}</Text>
//         <Image style={{height: 50, width: 50}} source={item?.image} />
//       </TouchableOpacity>
//     );
//   };

//   /**
//    *
//    * @_renderItem Componnet
//    * @returns Ui to the Swipper FlatLIst
//    */
//   const _renderItem = ({item}: any) => (
//     <View style={styles.swiperListStyle}>
//       <Image
//         resizeMode="stretch"
//         source={{uri: item?.data?.imageUrl}}
//         style={styles.text}></Image>
//     </View>
//   );
//   return (
//     <View style={styles.container}>
//       <View style={styles.innerMainViewStyle}>
//         <SwiperFlatList
//           autoplay
//           autoplayDelay={2}
//           autoplayLoop
//           data={items}
//           showPagination
//           renderItem={_renderItem}
//           paginationActiveColor={'green'}
//           paginationStyleItem={{
//             height: 10,
//             width: 10,
//             marginHorizontal: 5,
//           }}
//         />
//       </View>
//       <Text style={styles.categoryStyle}>{'Select by category'}</Text>
//       <FlatList
//         horizontal
//         data={categoryData}
//         showsHorizontalScrollIndicator={false}
//         renderItem={_renderCategoryItem}
//       />
//     </View>
//   );
// };

// export default Notifications;
// const {width, height} = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerMainViewStyle: {
//     marginLeft: 5,
//     marginTop: 10,
//   },
//   swiperListStyle: {
//     width: width,
//     height: height / 4,
//   },
//   text: {
//     height: height / 5,
//     width: width - 10,
//     borderRadius: 20,
//   },
//   categoryStyle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: 'black',
//     marginLeft: 20,
//   },
// });
