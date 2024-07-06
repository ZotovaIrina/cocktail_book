import { useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Appbar, Menu } from 'react-native-paper'
import { Routes } from '../../App'

export const TopNavigation: FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState<boolean>(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={<Appbar.Action icon="menu" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate(Routes.Cocktails)
            closeMenu()
          }}
          title={t('navigation.cocktails')}
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate(Routes.Ingredients)
            closeMenu()
          }}
          title={t('navigation.ingredients')}
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate(Routes.AddIngredient)
            closeMenu()
          }}
          title={t('navigation.addIngredient')}
        />
      </Menu>
      <Appbar.Content title={t('navigation.appName')} />
    </Appbar.Header>
  )
}
