import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');
import {normalize, vh, vw} from '../utils/dimensions';
const Header = ({title, icon, count, onClickIcon}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {icon && (
        <View style={styles.innerMainViewStyle}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              onClickIcon();
            }}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onClickIcon();
            }}
            style={styles.count}>
            <Text style={{color: '#fff'}}>{count ? count : '0'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    height: vh(60),
    width: width,
    elevation: 5,
    backgroundColor: '#fff',

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: vw(15),
    paddingLeft: vw(15),
  },
  innerMainViewStyle: {
    width: vw(50),
    height: vw(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: 'purple',
  },
  icon: {
    width: vw(24),
    height: vw(24),
  },
  count: {
    backgroundColor: 'red',
    width: vw(20),
    height: vw(20),
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
