import React from 'react';
import COLORS from '../utils/color';
import {Image, StyleSheet} from 'react-native';
import routesNames from '../utils/routesNames';
import AddItems from '../modules/admin/AddItem';
import Settings from '../modules/admin/settings';
import GetAllItems from '../modules/admin/GetAllItem';
import AdminNotification from '../modules/admin/AdminNotification';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function MyAdminTabs() {
  return (
    <Tab.Navigator
      initialRouteName={routesNames.AddItems}
      screenOptions={{
        tabBarActiveTintColor: COLORS.BLACK,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={routesNames.AddItems}
        component={AddItems}
        options={{
          tabBarLabel: 'AddItems',
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
        name={routesNames.GetAllItems}
        component={GetAllItems}
        options={{
          tabBarLabel: 'All Items',
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
        name={routesNames.AdminNotification}
        component={AdminNotification}
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
        name={routesNames.settings}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../images/setting_fill.png')
                  : require('../images/settings.png')
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
