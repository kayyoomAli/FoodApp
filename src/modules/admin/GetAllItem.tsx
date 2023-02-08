import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  vh,
  vw,
  normalize,
  DesignWidth,
  DesignHeight,
} from '../../utils/dimensions';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const GetAllItems = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [items, setItems] = useState([]);
  const [isloader, setisloader] = useState(false);

  useEffect(() => {
    getItems();
  }, [isFocused]);

  /**
   * @getItems function
   * @description getting item from the firebase
   */
  const getItems = () => {
    setisloader(true);
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        setisloader(false);
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
        setItems(tempData);
      })
      .catch(err => {
        setisloader(false);
        console.log('error', err);
      });
  };

  /**
   *
   * @deleteItem function
   * @description deleting item from specific selected
   */
  const deleteItem = (docId: any) => {
    setisloader(true);
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        setisloader(false);
        console.log('User deleted!');
        getItems();
      })
      .catch(err => {
        setisloader(false);
        console.log('errr', err);
      });
  };
  /**
   *@_renderItem Compnenet
   * @returns returning the Ui to FlatList
   */
  const _renderItem = ({item}: any) => {
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
        <View style={{margin: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditItem', {
                data: item?.data,
                id: item?.id,
              });
            }}>
            <Image
              source={require('../../images/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteItem(item?.id);
            }}>
            <Image
              source={require('../../images/delete.png')}
              style={[styles.icon, {marginTop: 20}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={_renderItem} />
      {isloader && (
        <ActivityIndicator
          color={'red'}
          style={styles.indicatorStyle}
          size={'large'}
        />
      )}
    </View>
  );
};

export default GetAllItems;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    elevation: 4,
    width: '90%',
    height: vh(100),
    alignSelf: 'center',
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
    width: '53%',
    margin: normalize(10),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: '700',
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
  icon: {
    width: vw(24),
    height: vw(24),
  },
  indicatorStyle: {
    zIndex: 1,
    width: DesignWidth,
    position: 'absolute',
    height: DesignHeight,
  },
});
