import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { colors, typography } from '@/config/Constants';

interface TextInputsProps extends TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  defaultValue?: string;
  disabled?: boolean;
  multiline?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  onPressIcon?: () => void;
}

const TextInputs: React.FC<TextInputsProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  style: AddOnStyle,
  inputStyle,
  defaultValue,
  disabled = false,
  multiline = false,
  icon,
  onBlur,
  error,
  onPressIcon,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={[styles.viewStyles, AddOnStyle]}>
      {label ? (
        <Text style={[typography['paragraph3'], { marginBottom: 8 }]}>
          {label}
        </Text>
      ) : null}
      <View style={{ justifyContent: 'center' }}>
        <TextInput
          placeholder={placeholder}
          defaultValue={defaultValue}
          editable={!disabled}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          secureTextEntry={showPassword}
          style={[
            typography['paragraph3'],
            styles.inputStyles,
            {
              paddingVertical: multiline ? 10 : 5,
              borderColor: error
                ? colors.warning
                : isFocused
                  ? colors.primary
                  : colors.grey.light,
            },
            inputStyle,
          ]}
          selectionColor={colors.primaryContainer}
          cursorColor={colors.primary}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...textInputProps}
        />
        {icon && !secureTextEntry ? (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.grey.dark}
            onPress={onPressIcon}
            style={styles.iconStyles}
          />
        ) : null}
        {secureTextEntry ? (
          <MaterialCommunityIcons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.grey.dark}
            onPress={togglePasswordVisibility}
            style={styles.iconStyles}
          />
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    marginBottom: 16,
  },
  inputStyles: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
  },
  iconStyles: {
    position: 'absolute',
    right: 16,
  },
  errorText: {
    marginTop: 4,
    color: colors.warning,
    ...typography['paragraph3'],
  },
});

export default TextInputs;
