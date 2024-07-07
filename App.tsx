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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FC } from 'react'
import { BottomNavigation } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonActions } from '@react-navigation/native'
import { AddButton } from './src/navigation/AddButton'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
  return (
    <PaperProvider>
      <TabNavigation />
    </PaperProvider>
  )
}

export function TabNavigation() {
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
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (event.defaultPrevented) {
                preventDefault()
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                })
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key]
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 })
              }

              return null
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key]
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title

              return label
            }}
          />
        )}
      >
        <Tab.Screen
          name={Routes.Cocktails}
          component={Cocktails}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Icon name="glass-cocktail" size={size} color={color} />
            },
            title: t(screenLabel[Routes.Cocktails]),
          }}
        />
      
        <Tab.Screen
          name={Routes.Ingredients}
          component={Ingredients}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Icon name="bottle-wine" size={size} color={color} />
            },
            title: t(screenLabel[Routes.Ingredients]),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
