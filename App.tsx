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
const screenLabel: Record<Routes, string> = {
  [Routes.AddIngredient]: 'navigation.addIngredient',
  [Routes.Ingredients]: 'navigation.ingredients',
  [Routes.Cocktails]: 'navigation.cocktails',
}

export default function App() {
  const { t } = useTranslation()
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
        <View testID="app-wrapper" style={{ flex: 1 }}>
          <Stack.Navigator
            initialRouteName={Routes.Ingredients}
            screenOptions={{ headerTitleAlign: 'center' }}
          >
            <Stack.Screen
              name={Routes.Ingredients}
              options={{ title: t(screenLabel[Routes.Ingredients]) }}
            >
              {(props) => <Ingredients navigation={props.navigation} />}
            </Stack.Screen>
            <Stack.Screen
              name={Routes.AddIngredient}
              component={AddIngredient}
              options={{
                title: t(screenLabel[Routes.AddIngredient]),
              }}
            />
            <Stack.Screen
              name={Routes.Cocktails}
              component={Cocktails}
              options={{ title: t(screenLabel[Routes.Cocktails]) }}
            />
          </Stack.Navigator>
        </View>
      </PaperProvider>
    </NavigationContainer>
  )
}
