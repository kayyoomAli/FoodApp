import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../utils/color';
import Header from '../../custom/Header';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  DesignHeight,
  DesignWidth,
  normalize,
  vh,
  vw,
} from '../../utils/dimensions';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

import {useIsFocused, useNavigation} from '@react-navigation/native';

let userId: any = '';
/**
 *
 * @Home Component
 * @description return  the Ui of the HomeScreen
 */
const Home = () => {
  const isFocused = useIsFocused();
  const [items, setItems] = useState([]);
  const navigation = useNavigation<any>();
  const [isLoad, setIsLoad] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [itemsSwiper, setItemsSwiper] = useState([]);
  const categoryData = [
    {
      id: 1,
      image: require('../../images/cart.png'),
      title: 'Meat',
      color: 'tomato',
    },
    {
      id: 2,
      image: require('../../images/cart.png'),
      title: 'Pizza',
      color: 'thistle',
    },
    {
      id: 3,
      image: require('../../images/cart.png'),
      title: 'Burgers',
      color: 'skyblue',
    },
    {
      id: 4,
      image: require('../../images/cart.png'),
      title: 'Noodels',
      color: 'teal',
    },
    {
      id: 5,
      image: require('../../images/cart.png'),
      title: 'Coldrinks',
      color: 'orange',
    },
  ];

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  useEffect(() => {
    setIsLoad(true);
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData: any = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData?.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setIsLoad(false);

        setItems(tempData);
      })
      .catch(err => {
        setIsLoad(false);
        console.log('err @1 ', err);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  /**
   * @returns the items to the uI as screen get render
   */
  useEffect(() => {
    setIsLoad(true);

    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData: any = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData?.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItemsSwiper(tempData);
        setIsLoad(false);
      })
      .catch(err => {
        console.log('err @2', err);
        setIsLoad(false);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  /**
   *
   * @_renderCategoryItem Component
   * @returns  View and Styling of Category Item
   */
  const _renderCategoryItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[styles.categoryTouchableStyle, {backgroundColor: item?.color}]}>
        <Text>{item?.title}</Text>
        <Image style={{height: 50, width: 50}} source={item?.image} />
      </TouchableOpacity>
    );
  };

  /**
   *
   * @_renderItem Componnet
   * @returns Ui to the Swipper FlatLIst
   */
  const _renderItemOfSwiperList = ({item}: any) => (
    <View style={styles.swiperListStyle}>
      <Image
        resizeMode="stretch"
        source={{uri: item?.data?.imageUrl}}
        style={styles.text}></Image>
    </View>
  );
  /**
   *
   * @getCartItems Function
   * @description return the userId and firebase Users
   */
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user: any = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data?.cart.length);
  };

  /**
   *
   * @onAddToCart Function
   * @description set the data to firebase and cart screen
   */
  const onAddToCart = async (item: any, index: any) => {
    const user: any = await firestore().collection('users').doc(userId).get();
    console.log(user._data?.cart);
    let tempDart = [];
    tempDart = user._data?.cart;
    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map((itm: any) => {
        if (itm.id == item?.id) {
          existing = true;
          itm.data.qty = itm?.data?.qty + 1;
        }
      });
      if (existing == false) {
        tempDart.push(item);
      }
      firestore().collection('users').doc(userId).update({
        cart: tempDart,
      });
    } else {
      tempDart.push(item);
    }
    console.log(tempDart);
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };

  /**
   *
   * @Cart Component
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
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            onAddToCart(item, index);
          }}>
          <Text style={{color: COLORS.WHITE}}>Add To cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   *
   * @Cart Componet
   * @description return when the list is Empty
   */
  const _ListEmptyComponent = () => {
    return (
      <View style={styles.listEmptyContainerStyle}>
        <Text style={styles.listEmptyTextStyle}>
          {'Sorry you do not have any item'}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title={'FoodApp'}
        icon={require('../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <View style={styles.innerMainViewStyle}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          data={itemsSwiper}
          showPagination
          renderItem={_renderItemOfSwiperList}
          paginationActiveColor={'green'}
          paginationStyleItem={{
            height: vw(10),
            width: vw(10),
            marginHorizontal: normalize(5),
          }}
        />
      </View>
      <Text style={styles.categoryStyle}>{'Select by category'}</Text>
      <FlatList
        horizontal
        data={categoryData}
        showsHorizontalScrollIndicator={false}
        renderItem={_renderCategoryItem}
      />
      <FlatList
        data={items}
        renderItem={_renderItem}
        ListEmptyComponent={_ListEmptyComponent}
        // contentContainerStyle={}
      />
      {isLoad && (
        <ActivityIndicator style={styles.indicatorStyle} size={'large'} />
      )}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    width: '90%',
    elevation: 4,
    height: vh(100),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: normalize(10),
    borderRadius: normalize(10),
    marginBottom: normalize(10),
  },
  itemImage: {
    margin: 5,
    width: vw(90),
    height: vw(90),
    borderRadius: normalize(10),
  },
  nameView: {
    width: '30%',
    margin: normalize(10),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
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
  addToCartBtn: {
    marginLeft: vw(10),
    padding: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: COLORS.purple,
  },
  listEmptyContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: normalize(20),
  },
  // container: {
  //   flex: 1,
  // },
  innerMainViewStyle: {
    marginLeft: 5,
    marginTop: 10,
  },
  swiperListStyle: {
    width: width,
    height: height / 4,
  },
  text: {
    height: height / 5,
    width: width - 10,
    borderRadius: 20,
  },
  categoryStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 20,
  },
  categoryTouchableStyle: {
    margin: normalize(10),
    alignItems: 'center',
    borderWidth: 1,
    height: vh(80),
    width: vw(100),
    marginLeft: vw(20),
    borderRadius: normalize(10),
  },
  indicatorStyle: {
    zIndex: 1,
    width: DesignWidth,
    position: 'absolute',
    height: DesignHeight,
  },
  // child: {width: DesignWidth, height: 100},
  // text: {fontSize: DesignWidth * 0.5, textAlign: 'center'},
});
