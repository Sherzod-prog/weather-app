import React from 'react';
import {StyleSheet, View, Text, Image, useColorScheme} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatNumber, formattedDate} from '../helpers';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ForecastProps} from '../types';

export default function Forecast({temp, dt, humidity, icon}: ForecastProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={[textStyle, styles.text]}>
          {formattedDate(dt).slice(0, 8)}
        </Text>
        <Image
          style={styles.icon}
          source={{
            uri: `https:${icon}`,
          }}
        />
        <Text style={[styles.text, styles.textTemp, textStyle]}>
          {formatNumber(temp)}°
        </Text>
        <Text style={[styles.text, textStyle]}>
          <MaterialCommunityIcons
            style={[styles.icon, textStyle]}
            name="weather-rainy"
          />{' '}
          {humidity} %
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: 'white',
    marginHorizontal: 5,
    backgroundColor: `rgba(110,110,110,0.15)`,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: 120,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 5,
  },
  textTemp: {
    fontSize: 22,
  },
  icon: {
    width: 70,
    height: 40,
  },
});
