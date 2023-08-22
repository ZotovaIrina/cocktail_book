import React from 'react'
import { View, Text } from 'react-native'

export const InputCell: React.FC<{
  label: string
  children: React.ReactNode
}> = ({ label, children }) => {
  return (
    <View>
      <Text>{label}</Text>
      {children}
    </View>
  )
}
