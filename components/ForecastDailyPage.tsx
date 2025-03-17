import React from 'react';
import {StyleSheet, View, Text, Image, useColorScheme} from 'react-native';
import {formatNumber, formattedTime} from '../helpers';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ForecastDailyProps} from '../types';

export default function ForecastDailyPage({
  temp,
  dt,
  icon,
}: ForecastDailyProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textStyle]}>{formattedTime(dt)}</Text>
      <Image
        style={styles.icon}
        source={{
          uri: `https:${icon}`,
        }}
      />
      <Text style={[styles.text, textStyle]}>{formatNumber(temp)}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: `rgba(110,110,110,0.15)`,
    borderRadius: 8,
    paddingVertical: 5,
    width: 60,
  },
  text: {
    paddingVertical: 3,
  },
  icon: {
    width: 40,
    height: 30,
    marginHorizontal: 2,
    marginVertical: 3,
  },
});
