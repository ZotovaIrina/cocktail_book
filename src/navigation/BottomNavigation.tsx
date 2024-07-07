import { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, Text, BottomNavigation } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Ingredients } from '../ingredients/components/Ingredients'
import { Cocktails } from '../cocktails/Cocktails'
import { View, TouchableOpacity } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Routes, screenLabel } from '../../App'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }) {
  console.log(state, descriptors, navigation)
  const { t } = useTranslation()
  return (
    <BottomNavigation.Bar >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = t(screenLabel[route.name as Routes] || '')

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </BottomNavigation.Bar>
  )
}

// ...

export const BottomNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name={Routes.Cocktails} component={Cocktails} />
        <Tab.Screen name={Routes.Ingredients} component={Ingredients} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
