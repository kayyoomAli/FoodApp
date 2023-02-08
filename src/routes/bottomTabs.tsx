import React from 'react';
import COLORS from '../utils/color';
import Home from '../modules/home/Home';
import Orders from '../modules/home/Order';
import Profile from '../modules/home/Profile';
import {Image, StyleSheet} from 'react-native';
import routesNames from '../utils/routesNames';
import Notifications from '../modules/home/Notifications';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={routesNames.HomeScreen}
      screenOptions={{
        tabBarActiveTintColor: COLORS.BLACK,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={routesNames.HomeScreen}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../images/home_fill.png')
                  : require('../images/home.png')
              }
              style={styles.bottomIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routesNames.Order}
        component={Orders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../images/orders_fill.png')
                  : require('../images/order.png')
              }
              style={styles.bottomIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routesNames.Notifications}
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                !focused
                  ? require('../images/notification.png')
                  : require('../images/notification_fill.png')
              }
              style={[styles.bottomIcon]}
            />
          ),
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name={routesNames.Profile}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../images/profile_fill.png')
                  : require('../images/profile.png')
              }
              style={styles.bottomIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomIcon: {
    width: 24,
    height: 24,
  },
});
