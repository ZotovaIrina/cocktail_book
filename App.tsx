import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { AddIngredient } from './src/ingredients/components/AddIngredient'
import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import './src/translate'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ingredients } from './src/ingredients/components/Ingredients'

const Stack = createNativeStackNavigator()

export enum Routes {
  Ingredients = 'Ingredients',
  AddIngredient = 'AddIngredient'
}

export default function App() {
  const { t } = useTranslation()
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.Ingredients}>
          <Stack.Screen name={Routes.Ingredients}>
            {(props) => <Ingredients navigation={props.navigation} />}
          </Stack.Screen>
          <Stack.Screen name={Routes.AddIngredient} component={AddIngredient} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
})
