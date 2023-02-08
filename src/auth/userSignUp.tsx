import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  DesignHeight,
  DesignWidth,
  normalize,
  vh,
  vw,
} from '../utils/dimensions';
import COLORS from '../utils/color';
import languages from '../utils/en';
import uuid from 'react-native-uuid';
import React, {useState} from 'react';
import routesNames from '../utils/routesNames';
import {localeImage} from '../utils/localeImages';
import CustomButton from '../custom/CustomButton';
import CustomTextInput from '../custom/CustomTextInput';
import firestore from '@react-native-firebase/firestore';
const UserSignup = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isloader, setIsloader] = useState(false);
  /**
   * @saveUser Function
   * @description save the data at the firebase and give acess to user
   */

  const saveUser = () => {
    setIsloader(true);
    const userId: any = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
        cart: [],
      })
      .then(res => {
        setIsloader(false);
        navigation.goBack();
      })
      .catch(error => {
        setIsloader(false);
        console.log(error);
      });
  };

  /**
   * @onPressSignUp Function
   * @description check validity onOnpress Function
   */
  const onPressSignUp = () => {
    if (
      email !== '' &&
      password !== '' &&
      name !== '' &&
      mobile !== '' &&
      mobile.length > 9
    ) {
      saveUser();
    } else {
      Alert.alert('Please Enter Data');
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logoImageStyle} source={localeImage.permission} />
      <Text style={styles.title}>{languages.signUp}</Text>
      <View style={styles.bottomwidthStyle}></View>
      <Text style={styles.EmailTextStyle}>{languages.user_name}</Text>
      <CustomTextInput
        value={name}
        placeholder={'Enter Name'}
        onChangeText={txt => setName(txt)}
        TextInputstyle={styles.TextInputStyle}
        placeholderTextColor={COLORS.BLACK}
      />
      <Text style={styles.EmailTextStyle}>{languages.email}</Text>
      <CustomTextInput
        value={email}
        placeholder={'example@yopmail.com'}
        TextInputstyle={styles.TextInputStyle}
        onChangeText={txt => setEmail(txt)}
      />
      <Text style={styles.EmailTextStyle}>{languages.mobile}</Text>
      <CustomTextInput
        value={mobile}
        maxLength={10}
        placeholder={'9999999999'}
        keyboardType={'number-pad'}
        TextInputstyle={styles.TextInputStyle}
        onChangeText={txt => setMobile(txt)}
      />
      <Text style={styles.EmailTextStyle}>{languages.password}</Text>
      <CustomTextInput
        value={password}
        placeholder={'Example@123'}
        TextInputstyle={styles.TextInputStyle}
        onChangeText={txt => setPassword(txt)}
        secureTextEntry
      />
      <CustomButton
        buttonText={languages.signUp}
        buttonTextStyle={{color: COLORS.WHITE}}
        onPress={onPressSignUp}
      />
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate(routesNames.userLogin);
        }}>
        {languages.already_user}
      </Text>
      {isloader && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            zIndex: 1,
            width: DesignWidth,
            height: DesignHeight / 2,
          }}
          size={'large'}
        />
      )}
    </View>
  );
};

export default UserSignup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vw(20),
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '800',
    marginTop: vh(40),
    marginLeft: vw(30),
  },
  bottomwidthStyle: {
    width: vw(110),
    marginTop: vh(7),
    marginLeft: vw(20),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.purple,
  },
  logoImageStyle: {
    width: vw(100),
    height: vw(100),
    borderRadius: 80,
    marginTop: vh(25),
    alignSelf: 'center',
    backgroundColor: COLORS.purple,
  },
  TextInputStyle: {
    fontSize: vh(17),
    marginLeft: vw(20),
    color: COLORS.BLACK,
    borderBottomWidth: 1,
  },
  createNewAccount: {
    fontSize: normalize(18),
    marginTop: vh(20),
    fontWeight: '600',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: COLORS.BLACK,
  },
  EmailTextStyle: {
    marginLeft: vw(20),
    marginTop: vh(25),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontSize: normalize(16),
  },
});
