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
import { Cocktails } from './src/cocktails/Cocktails'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { FC } from 'react'

const Stack = createNativeStackNavigator()
const Tabs = createMaterialBottomTabNavigator()

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
    <PaperProvider>
      <TabNavigation />
    </PaperProvider>
  )
}
export function StackNavigation() {
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
            options={{ title: t(screenLabel[Routes.Cocktails]) }}
          >
            {(props) => <TabNavigation navigation={props.navigation} />}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
}
export function TabNavigation() {
  const { t } = useTranslation()
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen
          name={Routes.Cocktails}
          component={Cocktails}
          options={{
            tabBarIcon: 'glass-cocktail',
            title: t(screenLabel[Routes.Cocktails]),
          }}
        />
        <Tabs.Screen
          name={Routes.Ingredients}
          component={Ingredients}
          options={{
            tabBarIcon: 'bottle-wine',
            title: t(screenLabel[Routes.Ingredients]),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}
