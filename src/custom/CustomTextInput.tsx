import {
  StyleProp,
  TextInput,
  TextStyle,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import {vh, vw} from '../utils/dimensions';

/**
 * @CustomTextInputProps interface
 * @description defining the props of TextInput
 */
interface CustomTextInputProps {
  placeholder?: string;
  value?: string | undefined;
  placeholderTextColor?: string;
  maxLength?: number | undefined;
  secureTextEntry?: boolean | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  TextInputstyle?: StyleProp<TextStyle> | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  inputMode?: any;
}

/**
 * @CustomTextInput function
 * @description custom component of TextInput
 */
const CustomTextInput = (props: CustomTextInputProps) => {
  return (
    <TextInput
      {...props}
      value={props.value}
      maxLength={props.maxLength}
      onChangeText={props.onChangeText}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      style={[styles.inputStyle, props.TextInputstyle]}
      // inputMode={props.inputMode}
      placeholderTextColor={
        props.placeholderTextColor ? props.placeholderTextColor : 'black'
      }
      placeholder={props.placeholder ? props.placeholder : 'Placeholder'}
    />
  );
};

export default React.memo(CustomTextInput);

const styles = StyleSheet.create({
  inputStyle: {
    height: vh(50),
    borderBottomWidth: 1,
    marginHorizontal: vw(20),
  },
});
