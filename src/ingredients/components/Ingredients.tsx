import { View, SafeAreaView } from 'react-native'
import { FC } from 'react'
import { TopNavigation } from '../../navigation/TopNavigation'

export const Ingredients: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View>
      <SafeAreaView>
        <TopNavigation navigation={navigation} />
        Ingredients
      </SafeAreaView>
    </View>
  )
}
