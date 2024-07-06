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
import { Cocktails } from './src/ingredients/components/Cocktails'

const Stack = createNativeStackNavigator()

export enum Routes {
  Ingredients = 'Ingredients',
  AddIngredient = 'AddIngredient',
  Cocktails = 'Cocktails',
}

export default function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['/'],
        config: {
          screens: {
            [Routes.AddIngredient]: Routes.AddIngredient,
            [Routes.Ingredients]: Routes.Ingredients,
            [Routes.Cocktails]: Routes.Cocktails,
          },
        },
      }}
    >
      <PaperProvider>
        <Stack.Navigator initialRouteName={Routes.Ingredients}>
          <Stack.Screen name={Routes.Ingredients}>
            {(props) => <Ingredients navigation={props.navigation} />}
          </Stack.Screen>
          <Stack.Screen name={Routes.AddIngredient} component={AddIngredient} />
          <Stack.Screen name={Routes.Cocktails} component={Cocktails} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}
