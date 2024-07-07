import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FAB } from 'react-native-paper'
import { Routes } from '../../App'

export const AddButton: FC<{ navigation?: any }> = ({ navigation }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)

  return <FAB icon={'plus'} />
}
