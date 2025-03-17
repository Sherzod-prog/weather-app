/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './components/Home';
import Geolocation from '@react-native-community/geolocation';

const image = {
  uri: 'https://plus.unsplash.com/premium_photo-1686600889814-1c9494b45e8b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};
const imageDark = {
  uri: 'https://plus.unsplash.com/premium_photo-1667833904931-7c59e583f76a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [cityContent] = useState([
    'Chelak',
    'Paris, France',
    'Tokyo, Japan',
    'Berlin, Germany',
    'Sydney, Australia',
  ]);
  const getLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          console.log('Error:', error);
          if (error.code === 1) {
            Alert.alert(
              'Permission Denied',
              'Location permission was not granted.',
            );
          } else if (error.code === 2) {
            Alert.alert(
              'Position Unavailable',
              'Unable to determine your location.',
            );
          } else if (error.code === 3) {
            Alert.alert('Timeout', 'Location request timed out.');
          } else {
            Alert.alert('Error', 'An unknown error occurred.');
          }
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } catch (error) {}
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          blurRadius={100}
          source={isDarkMode ? image : imageDark}
          resizeMode="cover"
          style={[styles.image, {borderWidth: 1}]}>
          <Home location={location} />
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    color: 'red',
  },
});

export default App;
