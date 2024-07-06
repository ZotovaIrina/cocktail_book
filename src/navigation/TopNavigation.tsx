import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import { Appbar, Button, Menu, Divider } from 'react-native-paper'

export const TopNavigation = () => {
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
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
      <Appbar.Content title={t('navigation.appName')} />
    </Appbar.Header>
  )
}
