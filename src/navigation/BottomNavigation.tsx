import { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import { BottomNavigation, Text } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Ingredients } from '../ingredients/components/Ingredients'
import { Cocktails } from '../cocktails/Cocktails'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

const Tabs = createMaterialBottomTabNavigator()

export function TabNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Tabs.Navigator>
        <Tabs.Screen name="Todo" component={Ingredients} />
        <Tabs.Screen name="Completed" component={Ingredients} />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}
