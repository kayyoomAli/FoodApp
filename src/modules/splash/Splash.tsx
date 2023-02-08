import COLORS from '../../utils/color';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import routesNames from '../../utils/routesNames';
import {normalize, vw} from '../../utils/dimensions';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const [animation] = useState<any>(new Animated.Value(0));
  const navigation = useNavigation<any>();
  const {AdminEmail, UserEmail} = useSelector(
    (store: any) => store.AuthenticateReducer,
  );
  console.log('????', UserEmail);
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);

  /**
   * @description for Animation
   */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: Infinity,
      },
    ).start();
  }, []);
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  /**
   * @checkLogin .Function
   * @description to reset the screen from start
   */
  const checkLogin: any = async () => {
    if (UserEmail !== '') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: routesNames.mytabs}],
        }),
      );
    } else if (AdminEmail !== '') {
      navigation.navigate(routesNames.MyAdminTabss);
    } else {
      return navigation.navigate(routesNames.userLogin);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.ImageStyle}
        source={require('../../images/logo.png')}
      />
      <Animated.Text style={[styles.logo, {opacity}]}>
        {'Food App'}
      </Animated.Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.purple,
  },
  logo: {
    fontSize: normalize(30),
    fontWeight: '800',
    color: COLORS.WHITE,
  },
  ImageStyle: {
    height: vw(200),
    width: vw(200),
    tintColor: 'white',
    borderTopRightRadius: vw(75),
    borderBottomLeftRadius: vw(75),
    resizeMode: 'contain',
  },
});

// const email: any = await AsyncStorage.getItem('EMAIL');
// const adminemail: any = await AsyncStorage.getItem('Admin EMAIL');
// console.log('email at splash', email);
// console.log('adminemail at splash', adminemail);
