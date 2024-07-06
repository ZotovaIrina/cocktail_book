import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FAB, Portal } from 'react-native-paper'
import { Routes } from '../../App'

export const AddButton: FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={'plus'}
        actions={[
          {
            icon: 'ammunition',
            label: t('navigation.addIngredient'),
            onPress: () => navigation.navigate(Routes.AddIngredient),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  )
}
