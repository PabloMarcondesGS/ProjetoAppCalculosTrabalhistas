import React, {memo} from 'react';

import {View, Text, TextInput} from "react-native";

import {Controller, Control} from "react-hook-form";

import styles from './styles';

interface Props {
  label: string;
  defaultValue?: string | number;
  placeholder?: string;
  placeholderTextColor?: string;
  controller: Control;
  name: string;
  error?: string;
};

const Input: React.FC<Props> = ({label, defaultValue = null, error, placeholder, placeholderTextColor="#c1bccc", controller, name}) => {
  return (
    <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={controller}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={[styles.input, {borderWidth: 2, borderColor: error ? '#BF1650' : "transparent"}]}
          onBlur={onBlur}
          placeholder={placeholder}
          onChangeText={value => onChange(value)}
          value={value}/>
      )}/>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default memo(Input);