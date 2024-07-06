import { FC, ReactNode } from 'react'
import { View } from 'react-native'

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <View
      testID="page-wrapper"
      style={{
        flexDirection: 'column',
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {children}
    </View>
  )
}
