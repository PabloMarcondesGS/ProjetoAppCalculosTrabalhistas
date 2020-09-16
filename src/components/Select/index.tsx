import React, {memo} from 'react';

import {View, Text, TextInput} from "react-native";

import {Controller, Control} from "react-hook-form";
import RNPickerSelect, {Item} from 'react-native-picker-select';
import styles, {pickerSelectStyles} from './styles';


interface Props {
  label: string;
  options: Item[];
  defaultValue?: string;
  placeholder: Item;
  controller: Control;
  name: string;
  error?: string;
};

const Select: React.FC<Props> = ({label, options, defaultValue = null, error, placeholder, controller, name}) => {
  return (
    <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={controller}
      name={name}
      defaultValue={placeholder}
      render={({ onChange, onBlur, value }) => (
        <RNPickerSelect
            placeholder={placeholder}
            items={options}
            onValueChange={value => onChange(value)}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles(!!error)}
            value={value}
            doneText="Pronto"
          />
      )}/>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default memo(Select);