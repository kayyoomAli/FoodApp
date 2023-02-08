import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  vh,
  vw,
  normalize,
  DesignWidth,
  DesignHeight,
} from '../utils/dimensions';
import COLORS from '../utils/color';
import languages from '../utils/en';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import routesNames from '../utils/routesNames';
import CustomButton from '../custom/CustomButton';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../custom/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {localeImage} from '../utils/localeImages';
/**
 *
 * @returns Ui and functionalty of User login
 */
const UserLogin = () => {
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState('');
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState('');
  const [isloader, setIsloader] = useState(false);

  /**
   * @adminLogin Function
   * @description User login and set Data to fireBase
   */
  const adminLogin = async () => {
    setIsloader(true);
    firestore()
      .collection('users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then((querySnapshot: any) => {
        dispatch({type: 'User_Data', payload: email});
        console.log(querySnapshot.docs);
        if (querySnapshot.docs[0]._data !== null) {
          if (
            querySnapshot.docs[0]._data.email === email &&
            querySnapshot.docs[0]._data.password === password
          ) {
            // goToNextScreen(
            //   querySnapshot.docs[0]._data.userId,
            //   querySnapshot.docs[0]._data.mobile,
            //   querySnapshot.docs[0]._data.name,
            navigation.navigate(routesNames.mytabs);
            // );
          }
        }
        setIsloader(false);
      })
      .catch(error => {
        setIsloader(false);
        console.log(error);
        Alert.alert('Please Check Email/Password');
      });
  };

  // const goToNextScreen = async (userId: any, mobile: any, name: any) => {
  //   await AsyncStorage.setItem('EMAIL', email);
  //   await AsyncStorage.setItem('USERID', userId);
  //   await AsyncStorage.setItem('MOBILE', mobile);
  //   await AsyncStorage.setItem('NAME', name);

  //   // navigation.navigate(routesNames.mytabs);
  // };

  /**
   * @onPressLogin Function
   * @description check Validity of User on OnpressLogin button
   */
  const onPressLogin = () => {
    if (email !== '' && password !== '') {
      adminLogin();
    } else {
      Alert.alert('Please Enter Data');
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logoImageStyle} source={localeImage.permission} />
      <Text style={styles.loginTextStyle}>{languages.Login}</Text>
      <View style={styles.bottomwidthStyle}></View>
      <Text style={styles.EmailTextStyle}>{languages.email}</Text>
      <CustomTextInput
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholder={'example@yopmail.com'}
        // inputMode="email"
        TextInputstyle={styles.TextInputStyle}
      />
      <Text style={[styles.EmailTextStyle, {marginTop: vh(30)}]}>
        {languages.password}
      </Text>
      <CustomTextInput
        value={password}
        secureTextEntry
        placeholder={languages.password}
        TextInputstyle={styles.TextInputStyle}
        onChangeText={txt => setPassword(txt)}
      />

      <CustomButton
        customButtonStyle={{marginTop: vh(70)}}
        buttonText={languages.Login}
        buttonTextStyle={{color: COLORS.WHITE}}
        onPress={onPressLogin}
      />
      <View style={styles.newAccountAndAdminLoginViewStyle}>
        <Text
          style={styles.createNewAccount}
          onPress={() => {
            navigation.navigate(routesNames.user_signup);
          }}>
          {languages.new_account}
        </Text>
        <Text
          style={styles.createNewAccount}
          onPress={() => {
            navigation.navigate(routesNames.admin_login);
          }}>
          {languages.admin_login}
          {'?'}
        </Text>
      </View>
      {isloader && (
        <ActivityIndicator style={styles.indicatorStyle} size={'large'} />
      )}
    </View>
  );
};

export default UserLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vw(20),
  },
  createNewAccount: {
    fontWeight: '600',
    alignSelf: 'center',
    color: COLORS.BLACK,
    fontSize: normalize(18),
    textDecorationLine: 'underline',
  },
  logoImageStyle: {
    width: vw(150),
    height: vw(150),
    borderRadius: 80,
    marginTop: vh(50),
    alignSelf: 'center',
    backgroundColor: COLORS.purple,
  },
  loginTextStyle: {
    fontSize: 20,
    marginTop: vh(40),
    fontWeight: 'bold',
    marginLeft: vw(40),
    color: COLORS.BLACK,
  },
  EmailTextStyle: {
    marginLeft: vw(20),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  TextInputStyle: {
    fontSize: vh(17),
    marginLeft: vw(20),
    color: COLORS.BLACK,
    borderBottomWidth: 1,
  },
  bottomwidthStyle: {
    width: vw(100),
    marginTop: vh(7),
    marginLeft: vw(20),
    marginBottom: vh(40),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.purple,
  },
  indicatorStyle: {
    zIndex: 1,
    width: DesignWidth,
    position: 'absolute',
    height: DesignHeight,
  },
  newAccountAndAdminLoginViewStyle: {
    marginTop: vh(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

// useEffect(() => {
//   getEmail();
// }, []);
// const getEmail = async () => {
//   const email: any = AsyncStorage.getItem('EMAIL');
//   console.log('email at login', email);
// };
