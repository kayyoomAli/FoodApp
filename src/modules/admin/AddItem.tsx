import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {
  vh,
  vw,
  normalize,
  DesignWidth,
  DesignHeight,
} from '../../utils/dimensions';
import React, {useState} from 'react';
import CustomButton from '../../custom/CustomButton';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../custom/CustomTextInput';
import {launchImageLibrary} from 'react-native-image-picker';
const AddItems = () => {
  const [price, setPrice] = useState<any>(0);
  const [isLoad, setIsload] = useState(false);
  const [name, setName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageData, setImageData] = useState<any>(null);
  const [discountPrice, setDiscountPrice] = useState<any>(0);
  const [description, setDescription] = useState<string>('');
  /**
   * @requestCameraPermission function
   * @description getting requesting Permission
   */
  const requestCameraPermission: any = async () => {
    try {
      const granted: any = await PermissionsAndroid.request(
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
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /**
   * @openGallery Function
   * @description check gallery and open
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
   * @uplaodImage  Function
   * @description upload Image to the FireStore
   */
  const uplaodImage = async () => {
    const reference: any = storage().ref(imageData?.assets[0]?.fileName);
    const pathToFile: any = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    uploadItem(url);
  };

  /**
   *
   * @uploadItem Function
   * @description upload all iten to the fireStore
   */
  const uploadItem = (url: any) => {
    setIsload(true);
    firestore()
      .collection('items')
      .add({
        name: name,
        price: price,
        imageUrl: url + '',
        description: description,
        discountPrice: discountPrice,
        qty: 1,
      })
      .then(res => {
        setIsload(false);
        console.log('User added!', res);
        setDescription('');
        setDiscountPrice('');
        setImageData(null);
        setImageUrl('');
        setName('');
        setPrice('');
      })
      .catch(err => {
        setIsload(false);
        console.log('Error', err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
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
            uplaodImage();
          }}
          buttonText={'Upload Items'}
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

export default AddItems;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 5,
    width: '100%',
    height: vh(60),
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
    height: vh(150),
    borderWidth: 1,
    marginTop: vw(20),
    marginLeft: vw(20),
    width: DesignWidth,
    alignItems: 'center',
    resizeMode: 'contain',
    borderColor: '#5246f2',
    justifyContent: 'center',
    borderRadius: normalize(10),
  },
  uploadBtn: {
    width: '90%',
    height: vh(50),
    marginTop: vw(20),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: vh(70),
    justifyContent: 'center',
    backgroundColor: '#5246f2',
    borderRadius: normalize(10),
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
    width: DesignWidth,
    position: 'absolute',
    height: DesignHeight,
  },
});
