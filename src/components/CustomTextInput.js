import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = ({ value, onChangeText }) => {
  return <TextInput value={value} onChangeText={onChangeText} />;
};

export default CustomTextInput;