import React from 'react';
import COLORS from '../../utils/color';
import {normalize, vh, vw} from '../../utils/dimensions';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const DetailsScreen = (props: any) => {
  const {item} = props.route.params;
  //   console.log('>>???>>', item?.name);
  return (
    <View style={styles.itemView}>
      <SharedElement id={`image` + item?.id}>
        <Image source={{uri: item?.data?.imageUrl}} style={styles.itemImage} />
      </SharedElement>
      <Text style={styles.DescriptionTextStyle}>
        {'Description aboout @' + item?.data?.name + '*'}
      </Text>
      <Text style={styles.detailDescriptionStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        consequatur nesciunt aut fugiat id explicabo doloribus architecto
        excepturi aliquid recusandae veritatis voluptas neque praesentium
        expedita nostrum quam deleniti, dolorum iusto! Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Accusantium consequatur nesciunt aut
        fugiat id explicabo doloribus architecto excepturi aliquid recusandae
        veritatis voluptas neque praesentium expedita nostrum quam deleniti,
        dolorum iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Accusantium consequatur nesciunt aut fugiat id explicabo doloribus
        architecto excepturi aliquid recusandae veritatis voluptas neque
        praesentium expedita nostrum quam deleniti, dolorum iusto!..
      </Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  itemView: {
    elevation: 4,
    marginTop: normalize(10),
    marginHorizontal: vw(10),
    marginBottom: normalize(10),
  },
  itemImage: {
    margin: 5,
    height: vw(300),
    resizeMode: 'contain',
    borderRadius: normalize(10),
  },
  DescriptionTextStyle: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginVertical: vh(10),
    fontSize: normalize(20),
    marginLeft: vw(10),
  },
  detailDescriptionStyle: {
    textAlign: 'justify',
    marginHorizontal: vw(10),
  },
});
