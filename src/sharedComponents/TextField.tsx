import React from 'react'
import { TextInput } from 'react-native-paper'

interface TextInputProps {
  value?: string
  onChange: (val: { target: { value: string } }) => void
  placeholder?: string
  label: string
}

export const TextField: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <TextInput
      mode="outlined"
      onChangeText={(text) => onChange({ target: { value: text } })}
      value={value}
      placeholder={placeholder}
    />
  )
}
