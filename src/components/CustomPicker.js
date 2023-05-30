import React from 'react';
import { Picker } from 'react-native';

const CustomPicker = ({ items, selectedValue, onValueChange }) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default CustomPicker;