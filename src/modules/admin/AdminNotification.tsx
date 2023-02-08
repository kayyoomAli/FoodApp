import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {localeImage} from '../../utils/localeImages';
import {normalize, vh, vw} from '../../utils/dimensions';

const AdminNotification = () => {
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    console.log('Pressed!');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, {transform: [{scale: scaleValue}]}]}>
        <Image source={localeImage.logo} style={styles.logo} />
        <Text style={styles.logoText}>Food App</Text>
      </Animated.View>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>Start</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: vw(100),
    height: vw(100),
  },
  logoText: {
    fontSize: normalize(20),
    marginTop: vh(10),
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginTop: vh(30),
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
});

export default AdminNotification;
