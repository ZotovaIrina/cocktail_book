import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Routes } from './BottomNavigation'

export const AddButton: FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const navigation = useNavigation()
  return (
    <FAB
      icon={'plus'}
      onPress={() => navigation.navigate(Routes.AddIngredient)}
    />
  )
}
