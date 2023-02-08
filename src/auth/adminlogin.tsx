import COLORS from '../utils/color';
import languages from '../utils/en';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import routesNames from '../utils/routesNames';
import CustomButton from '../custom/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {normalize, vh, vw} from '../utils/dimensions';
import CustomTextInput from '../custom/CustomTextInput';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {localeImage} from '../utils/localeImages';
import Header from '../custom/Header';
/**
 * @returns the Ui and the login functionalty of Admin pannel
 */
const AdminLogin = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * @adminLogin Function
   * @description login to access AdminPannel
   */
  const adminLogin = async () => {
    const users: any = await firestore().collection('admin').get();
    // console.log('Email at AdminLogin of fireBase >>> ', users);
    dispatch({type: 'Admin_Data', payload: email});
    if (
      email == users.docs[0]._data.email &&
      password == users.docs[0]._data.password
    ) {
      dispatch({type: 'Admin_Data', payload: email});
      navigation.navigate(routesNames.MyAdminTabss);
    } else {
      Alert.alert('wrong email or Password');
    }
  };

  /**
   * @onPress Function
   * @description Check validity on OnPress
   */
  const onPress = () => {
    if (email !== '' && password !== '') {
      adminLogin();
    } else {
      Alert.alert('Please Enter Data');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logoImageStyle} source={localeImage.permission} />
      <Text style={styles.loginTextStyle}>{languages.admin_login}</Text>
      <View style={styles.bottomwidthStyle}></View>
      <Text style={styles.EmailTextStyle}>{languages.email}</Text>
      <CustomTextInput
        value={email}
        placeholder={'example@gmail.com'}
        onChangeText={txt => setEmail(txt)}
        TextInputstyle={styles.TextInputStyle}
      />
      <Text style={styles.EmailTextStyle}>{languages.password}</Text>
      <CustomTextInput
        value={password}
        secureTextEntry
        placeholder={'Enter Password '}
        TextInputstyle={styles.TextInputStyle}
        onChangeText={txt => setPassword(txt)}
      />
      <CustomButton buttonText={languages.admin_login} onPress={onPress} />
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate(routesNames.userLogin);
        }}>
        {'User Login ?'}
        {'?'}
      </Text>
    </View>
  );
};

export default AdminLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vw(12),
  },
  logoImageStyle: {
    width: vw(150),
    height: vw(150),
    borderRadius: 80,
    marginTop: vh(50),
    alignSelf: 'center',
    backgroundColor: COLORS.purple,
  },
  title: {
    color: '#000',
    fontWeight: '800',
    alignSelf: 'center',
    fontSize: normalize(20),
  },
  EmailTextStyle: {
    marginLeft: vw(25),
    fontWeight: 'bold',
    marginTop: vh(20),
    color: COLORS.BLACK,
    fontSize: normalize(16),
  },
  TextInputStyle: {
    fontSize: vh(17),
    marginLeft: vw(20),
    color: COLORS.BLACK,
    borderBottomWidth: 1,
  },
  loginTextStyle: {
    fontSize: 20,
    marginTop: vh(40),
    fontWeight: 'bold',
    marginLeft: vw(40),
    color: COLORS.BLACK,
  },
  bottomwidthStyle: {
    width: vw(150),
    marginTop: vh(7),
    marginLeft: vw(20),
    marginBottom: vh(10),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.purple,
  },
  createNewAccount: {
    fontWeight: '600',
    marginTop: vh(50),
    alignSelf: 'center',
    color: COLORS.BLACK,
    fontSize: normalize(18),
    textDecorationLine: 'underline',
  },
});
