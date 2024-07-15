import { FC, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, FAB, IconButton, Menu } from 'react-native-paper'
import { Ingredients } from '../ingredients/components/Ingredients'
import { Cocktails } from '../cocktails/components/Cocktails'
import { View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AddIngredient } from '../ingredients/components/AddIngredient'
import { Settings } from '../settings/Settings'
import { ShoppingCart } from '../shoppingCart/ShoppingCart'
import { AddCocktail } from '../cocktails/components/AddCocktail'

const Tab = createBottomTabNavigator()
interface Route {
  name: Routes
  key: string
  params?: string[]
}
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
  AddCocktail = 'AddCocktail',
  Cocktails = 'Cocktails',
  PlusMenu = 'PlusMenu',
  SettingsMenu = 'SettingsMenu',
  ShoppingCart = 'ShoppingCart',
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
  [Routes.AddCocktail]: {
    label: 'navigation.addCocktail',
    tabBarTestID: Routes.AddCocktail,
    menuRoute: true,
    menuName: MenuName.Plus,
    icon: 'glass-cocktail',
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
  [Routes.SettingsMenu]: {
    label: 'navigation.settings',
    tabBarTestID: Routes.SettingsMenu,
    icon: 'cogs',
  },
  [Routes.ShoppingCart]: {
    label: 'navigation.shoppingCart',
    tabBarTestID: Routes.ShoppingCart,
    icon: 'cart',
  },
}

function MyTabBar({ navigation, state, descriptors, insets }: any) {
  const { t } = useTranslation()

  return (
    <View
      style={{
        padding: '4%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {state.routes.map((route: Route) => (
        <BottomMenuItem
          key={route.key}
          route={route}
          selected={route.key === state.history[state.history.length - 1].key}
          navigation={navigation}
        />
      ))}
    </View>
  )
}

// ...

export const BottomNav = () => {
  const { t } = useTranslation()
  return (
    <NavigationContainer
      linking={{
        prefixes: [],
        config: {
          screens: {
            [Routes.Cocktails]: Routes.Cocktails,
            [Routes.Ingredients]: Routes.Ingredients,
            [Routes.AddIngredient]: Routes.AddIngredient,
            [Routes.SettingsMenu]: Routes.SettingsMenu,
            [Routes.ShoppingCart]: Routes.ShoppingCart,
            [Routes.AddCocktail]: Routes.AddCocktail,
          },
        },
      }}
    >
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={({ route }) => ({
          headerShown: true,
        })}
      >
        <Tab.Screen
          name={Routes.Cocktails}
          component={Cocktails}
          options={{
            title: t(routesConfig[Routes.Cocktails].label),
          }}
        />
        <Tab.Screen
          name={Routes.Ingredients}
          component={Ingredients}
          options={{
            title: t(routesConfig[Routes.Ingredients].label),
          }}
        />
        <Tab.Screen
          name={Routes.PlusMenu}
          component={AddIngredient}
          options={{
            title: t(routesConfig[Routes.PlusMenu].label),
          }}
        />
        <Tab.Screen
          name={Routes.ShoppingCart}
          component={ShoppingCart}
          options={{
            title: t(routesConfig[Routes.ShoppingCart].label),
          }}
        />
        <Tab.Screen
          name={Routes.SettingsMenu}
          component={Settings}
          options={{
            title: t(routesConfig[Routes.SettingsMenu].label),
          }}
        />
        <Tab.Screen
          name={Routes.AddIngredient}
          component={AddIngredient}
          options={{
            title: t(routesConfig[Routes.AddIngredient].label),
          }}
        />
        <Tab.Screen
          name={Routes.AddCocktail}
          component={AddCocktail}
          options={{
            title: t(routesConfig[Routes.AddCocktail].label),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const BottomMenuItem: FC<{
  route: Route
  selected: boolean
  navigation: any
}> = ({ route, selected, navigation }) => {
  const [open, setOpen] = useState(false)
  const options = routesConfig[route.name]
  const { t } = useTranslation()
  const onPress = ({ route, selected }: any) => {
    if (!selected) {
      navigation.navigate(route.name, route.params)
    }
  }

  const onLongPress = ({ route, preventDefault }: any) => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }

  const getActions = (): {
    icon: string
    label: string
    onPress: () => void
  }[] => {
    const actions = Object.values(routesConfig).filter(
      (conf) => conf.menuName === options.menuName && conf.menuRoute
    )

    return actions.map((action) => ({
      icon: action.icon,
      label: action.label,
      onPress: () => {
        navigation.navigate(action.tabBarTestID)
        setOpen(false)
      },
    }))
  }

  return (
    <>
      {!options.menuRoute && !options.menuName && (
        <NavItem
          options={options}
          onLongPress={onLongPress}
          onPress={onPress}
          route={route}
          selected={selected}
          navigation={navigation}
        />
      )}

      {!options.menuRoute && options.menuName && (
        <Menu
          visible={open}
          onDismiss={() => setOpen(!open)}
          style={{
            left: 0,
            right: 0,
            width: '100%',
          }}
          anchor={
            <>
              {options.menuName === MenuName.Plus ? (
                <FAB
                  icon={options.icon}
                  onPress={() => {
                    setOpen(!open)
                  }}
                />
              ) : (
                <NavItem
                  options={options}
                  onLongPress={onLongPress}
                  onPress={() => {
                    setOpen(!open)
                  }}
                  route={route}
                  selected={selected}
                  navigation={navigation}
                />
              )}
            </>
          }
        >
          {getActions().map((action) => (
            <Menu.Item
              key={action.label}
              leadingIcon={action.icon}
              onPress={action.onPress}
              title={t(action.label)}
            />
          ))}
        </Menu>
      )}
    </>
  )
}

const NavItem: FC<{
  options: RouteConfig
  onPress: (prop: any) => void
  onLongPress: (prop: any) => void
  navigation: any
  selected: boolean
  route: Route
}> = ({ options, onPress, onLongPress, navigation, route, selected }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={t(options.label)}
      testID={options.tabBarTestID}
      onPress={(e) => {
        onPress({
          route: route,
          selected: selected,
        })
      }}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <IconButton
        mode={selected ? 'contained' : undefined}
        icon={options.icon}
      />
      <Text
        style={{
          color: selected ? '#673ab7' : '#222',
        }}
      >
        {t(options.label)}
      </Text>
    </TouchableOpacity>
  )
}
