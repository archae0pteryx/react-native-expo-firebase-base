import React from 'react'
import { Input } from 'react-native-elements'

export default function BasicInput(props) {
  const {
    type,
    label,
    handleChange,
    placeholder,
    value,
    secure = false,
    autoCompleteType = 'name',
  } = props
  return (
    <Input
      autoCapitalize='none'
      containerStyle={{ margin: 15 }}
      label={label}
      onChangeText={handleChange}
      placeholder={placeholder}
      value={value}
      textContentType={type}
      secureTextEntry={secure}
      autoCompleteType={autoCompleteType}
    />
  )
}
