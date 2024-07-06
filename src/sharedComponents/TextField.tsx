import React from 'react'
import { Control, useController } from 'react-hook-form'
import { TextInput } from 'react-native-paper'

interface TextInputProps {
  defaultValue?: string
  placeholder?: string
  label: string
  name: string
  control: Control<any, any>
}

export const TextField: React.FC<TextInputProps> = ({
  defaultValue,
  placeholder,
  label,
  name,
  control,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
  })
  return (
    <TextInput
      label={label}
      mode="outlined"
      onChangeText={field.onChange}
      value={field.value}
      placeholder={placeholder}
    />
  )
}
