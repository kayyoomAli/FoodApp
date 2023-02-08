import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextInput from '../../custom/CustomTextInput';
import CustomButton from '../../custom/CustomButton';
import {
  DesignHeight,
  DesignWidth,
  normalize,
  vh,
  vw,
} from '../../utils/dimensions';
const EditItem = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoad, setisloader] = useState(false);
  const [name, setName] = useState(route?.params?.data?.name);
  const [imageData, setImageData] = useState<any>({
    assets: [{uri: route?.params?.data?.imageUrl}],
  });
  const [price, setPrice] = useState(route?.params?.data?.price);
  const [discountPrice, setDiscountPrice] = useState(
    route?.params?.data?.discountPrice,
  );
  const [description, setDescription] = useState(
    route?.params?.data?.description,
  );
  /**
   * @requestCameraPermission Function
   * @description requesting permission from user
   */
  const requestCameraPermission = async () => {
    setisloader(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setisloader(false);
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
      setisloader(false);
    }
  };
  /**
   * @openGallery Function
   * @description requesting permisson for opening gallery
   */
  const openGallery = async () => {
    const result: any = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };

  /**
   * @uploadItem Function
   * @description uploading Item to the fireStore
   */
  const uploadItem = () => {
    setisloader(true);
    firestore()
      .collection('items')
      .doc(route?.params?.id)
      .update({
        name: name,
        price: price,
        discountPrice: discountPrice,
        description: description,
        imageUrl: route?.params?.data?.imageUrl + '',
      })
      .then(() => {
        setisloader(false);
        console.log('User added!');
        navigation.goBack();
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Item</Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{uri: imageData?.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : (
          <TouchableOpacity
            style={styles.pickBtn}
            onPress={() => {
              requestCameraPermission();
            }}>
            <Text>{'Add Image From Gallery'}y</Text>
          </TouchableOpacity>
        )}
        <CustomTextInput
          value={name}
          placeholder="Enter Item Name"
          TextInputstyle={styles.inputStyle}
          onChangeText={(text: string) => setName(text)}
        />
        <CustomTextInput
          value={price}
          placeholder="Enter Item Price"
          TextInputstyle={styles.inputStyle}
          onChangeText={(text: string) => setPrice(text)}
        />
        <CustomTextInput
          value={discountPrice}
          TextInputstyle={styles.inputStyle}
          placeholder="Enter Item Discount Price"
          onChangeText={(text: string) => setDiscountPrice(text)}
        />
        <CustomTextInput
          value={description}
          TextInputstyle={styles.inputStyle}
          placeholder="Enter Item Description"
          onChangeText={(text: string) => setDescription(text)}
        />
        <CustomTextInput
          value={imageUrl}
          TextInputstyle={styles.inputStyle}
          placeholder="Enter Item Image URL (Optional)"
          onChangeText={(text: string) => setImageUrl(text)}
        />
        <CustomButton
          onPress={() => {
            uploadItem();
          }}
          buttonText={'Update Items'}
          buttonTextStyle={{color: 'white'}}
          customButtonStyle={{
            backgroundColor: '#5246f2',
            marginTop: vh(40),
          }}
        />
      </View>
      {isLoad && (
        <ActivityIndicator
          color={'red'}
          style={styles.indicatorStyle}
          size={'large'}
        />
      )}
    </ScrollView>
  );
};

export default EditItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 5,
    height: vh(60),
    width: '100%',
    paddingLeft: vw(20),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: normalize(18),
  },

  inputStyle: {
    width: '90%',
    height: vh(50),
    borderWidth: 1,
    marginTop: vh(30),
    paddingLeft: vw(20),
    borderRadius: vw(10),
    paddingRight: vw(20),
    borderBottomWidth: 1,
    borderColor: '#5246f2',
    fontSize: normalize(18),
  },
  pickBtn: {
    width: '90%',
    height: vh(50),
    borderWidth: 0.5,
    borderRadius: normalize(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(20),
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: vh(50),
    borderRadius: normalize(10),
    alignSelf: 'center',
    marginTop: vh(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(70),
  },
  imageStyle: {
    borderWidth: 1,
    height: vw(150),
    marginTop: vw(20),
    width: DesignWidth,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: normalize(10),
  },
  indicatorStyle: {
    zIndex: 1,
    position: 'absolute',
    width: DesignWidth,
    height: DesignHeight,
  },
});

//   const uplaodImage = async () => {
//     const reference: any = storage().ref(imageData?.assets[0]?.fileName);
//     const pathToFile = imageData?.assets[0].uri;
//     // uploads file
//     await reference.putFile(pathToFile);
//     const url:any = await storage()
//       .ref(imageData?.assets[0].fileName)
//       .getDownloadURL();
//     console.log(url);
//     uploadItem(url);
//   };
