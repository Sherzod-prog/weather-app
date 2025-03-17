import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainInfoProps} from '../types';

const MainInfo: React.FC<MainInfoProps> = ({name, size, text, color}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
      <Text style={{color, marginHorizontal: 5, fontSize: 16}}>{text}</Text>
    </View>
  );
};

export default MainInfo;
