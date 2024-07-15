import React from 'react'
import { Control, useController } from 'react-hook-form'
import { KeyboardTypeOptions } from 'react-native'
import { TextInput } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface InputProps {
  defaultValue?: string
  placeholder?: string
  label: string
  name: string
  control: Control<any, any>
  endIcon?: IconSource
  startIcon?: IconSource
  onIconClick?: () => void
  numberOfLines?: number
  keyboardType?: KeyboardTypeOptions
}
export const TextField: React.FC<InputProps> = ({
  defaultValue,
  placeholder,
  label,
  name,
  control,
  endIcon,
  startIcon,
  onIconClick,
  numberOfLines,
  keyboardType,
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
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      right={endIcon && <TextInput.Icon icon={endIcon} onPress={onIconClick} />}
      left={
        startIcon && <TextInput.Icon icon={startIcon} onPress={onIconClick} />
      }
    />
  )
}
