import { FC, useState, useTransition } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, Text, BottomNavigation, FAB } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Ingredients } from '../ingredients/components/Ingredients'
import { Cocktails } from '../cocktails/Cocktails'
import { View, TouchableOpacity } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AddIngredient } from '../ingredients/components/AddIngredient'

const Tab = createBottomTabNavigator()
interface RouteConfig {
  label: string
  tabBarTestID: string
  menuRoute?: boolean
  menuName?: MenuName
  icon: string
}
export enum Routes {
  Ingredients = 'Ingredients',
  AddIngredient = 'AddIngredient',
  Cocktails = 'Cocktails',
  PlusMenu = 'PlusMenu',
}

enum MenuName {
  Plus = 'plus',
}

export const routesConfig: Record<Routes, RouteConfig> = {
  [Routes.AddIngredient]: {
    label: 'navigation.addIngredient',
    tabBarTestID: Routes.AddIngredient,
    menuRoute: true,
    menuName: MenuName.Plus,
    icon: 'bottle-wine',
  },
  [Routes.Ingredients]: {
    label: 'navigation.ingredients',
    tabBarTestID: Routes.Ingredients,
    icon: 'bottle-wine',
  },
  [Routes.Cocktails]: {
    label: 'navigation.cocktails',
    tabBarTestID: Routes.Cocktails,
    icon: 'glass-cocktail',
  },
  [Routes.PlusMenu]: {
    label: 'plus',
    tabBarTestID: Routes.PlusMenu,
    menuName: MenuName.Plus,
    icon: 'plus',
  },
}

function MyTabBar({ navigation, state, descriptors, insets }: any) {
  const { t } = useTranslation()

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={() => null}
      onTabLongPress={() => null}
      style={{
        padding: 20,
      }}
      renderTouchable={(props) => (
        <BottomMenuItem barProps={props} navigation={navigation} />
      )}
    />
  )
}

// ...

export const BottomNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name={Routes.Cocktails} component={Cocktails} />
        <Tab.Screen name={Routes.Ingredients} component={Ingredients} />
        <Tab.Screen name={Routes.AddIngredient} component={AddIngredient} />
        <Tab.Screen name={Routes.PlusMenu} component={AddIngredient} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const BottomMenuItem: FC<{ barProps: any; navigation: any }> = ({
  barProps,
  navigation,
}) => {
  const [open, setOpen] = useState(false)
  const options = routesConfig[barProps.route.name as Routes]
  const { t } = useTranslation()
  const onPress = ({ route, selected }: any) => {
    const e = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!selected && !e.defaultPrevented) {
      navigation.navigate(route.name, route.params)
    }
  }
  const onLongPress = ({ route, preventDefault }: any) => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }
  const getActions = (): any[] => {
    const actions = Object.values(routesConfig).filter(
      (conf) => conf.menuName === options.menuName && conf.menuRoute
    )

    return actions.map((action) => ({
      icon: action.icon,
      label: action.label,
      onPress: () =>
        onPress({
          route: barProps.route,
          selected: barProps.accessibilityState?.selected,
        }),
    }))
  }
  console.log(getActions())

  return (
    <>
      {!options.menuRoute && !options.menuName && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={barProps.accessibilityState}
          accessibilityLabel={t(options.label)}
          testID={options.tabBarTestID}
          onPress={(e) => {
            onPress({
              route: barProps.route,
              selected: barProps.accessibilityState?.selected,
            })
          }}
          onLongPress={onLongPress}
          style={{ flex: 1 }}
        >
          <Text
            style={{
              color: barProps.accessibilityState?.selected ? '#673ab7' : '#222',
            }}
          >
            {t(options.label)}
          </Text>
        </TouchableOpacity>
      )}
      {!options.menuRoute && options.menuName && (
        <FAB
          icon={options.icon}
          onPress={() => {
            setOpen(!open)
          }}
        />
      )}
      {open && <Text>open</Text>}
    </>
  )
}
