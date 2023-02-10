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
import DetailsScreen from '../modules/home/Details';
import OrderStatus from '../modules/checkout/OrderStatus';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routesNames.splash}
        screenOptions={{headerShown: false}}>
        <Stack.Screen component={Splash} name={routesNames.splash} />
        <Stack.Screen component={MyTabs} name={routesNames.mytabs} />
        <Stack.Screen component={OrderStatus} name={'OrderStatus'} />
        <Stack.Screen component={EditItem} name={routesNames.EditItem} />
        <Stack.Screen component={UserLogin} name={routesNames.userLogin} />
        <Stack.Screen component={AdminLogin} name={routesNames.admin_login} />
        <Stack.Screen component={UserSignUp} name={routesNames.user_signup} />
        <Stack.Screen component={MyAdminTabs} name={routesNames.MyAdminTabss} />
        <Stack.Screen
          options={{headerShown: true}}
          component={DetailsScreen}
          name={routesNames.DetailsScreen}
          sharedElements={(route, otherRoute, showing) => {
            const {item}: any = route.params;
            const uuid = item?.id;
            console.log('Idddd', uuid);
            return [`image` + uuid];
          }}
        />
        <Stack.Screen
          component={Cart}
          name={routesNames.Cart}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
