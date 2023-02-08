import React from 'react';
import MyTabs from './bottomTabs';
import MyAdminTabs from './AdminRoutes';
import Cart from '../modules/home/Cart';
import UserLogin from '../auth/userLogin';
import AdminLogin from '../auth/adminlogin';
import UserSignUp from '../auth/userSignUp';
import Splash from '../modules/splash/Splash';
import routesNames from '../utils/routesNames';
import EditItem from '../modules/admin/EditItem';
import OrderStatus from '../modules/checkout/OrderStatus';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routesNames.splash}
        screenOptions={{headerShown: false}}>
        <Stack.Screen component={Splash} name={routesNames.splash} />
        <Stack.Screen component={MyTabs} name={routesNames.mytabs} />
        <Stack.Screen component={EditItem} name={routesNames.EditItem} />
        <Stack.Screen component={UserLogin} name={routesNames.userLogin} />
        <Stack.Screen component={AdminLogin} name={routesNames.admin_login} />
        <Stack.Screen component={UserSignUp} name={routesNames.user_signup} />
        <Stack.Screen component={MyAdminTabs} name={routesNames.MyAdminTabss} />
        <Stack.Screen component={OrderStatus} name={'OrderStatus'} />
        <Stack.Screen
          component={Cart}
          name={routesNames.Cart}
          options={{headerShown: true}}
        />
        {/* <Stack.Screen
          component={AdminNotification}
          name={'AdminNotification'}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
