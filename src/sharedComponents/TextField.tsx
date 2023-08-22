import React from 'react'
import { TextInput } from 'react-native'
import { InputCell } from './InputCell'

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
    <InputCell label={label}>
      <TextInput
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
      />
    </InputCell>
  )
}
