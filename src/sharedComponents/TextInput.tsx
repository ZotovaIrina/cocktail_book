import React from 'react'
import { TextInput, View, Text } from 'react-native'

interface TextInputProps {
  value?: string
  onChange: (val?: string) => void
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
    <View>
      <Text>{label}</Text>
      <TextInput
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
      />
    </View>
  )
}
