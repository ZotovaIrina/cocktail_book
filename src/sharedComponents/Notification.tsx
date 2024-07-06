import { FC, useEffect, useState } from 'react'
import { Snackbar } from 'react-native-paper'

export const Notification: FC<{
  notification: string
  onDismiss?: () => void
}> = ({ notification, onDismiss }) => {
  const [visible, setVisible] = useState(false)
  const onDismissSnackBar = () => {
    setVisible(false)
    onDismiss?.()
  }
  useEffect(() => {
    if (notification) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        onDismiss?.()
      }, 3000)
    } else {
      setVisible(false)
    }
  }, [notification])
  return (
    <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
      {notification}
    </Snackbar>
  )
}
