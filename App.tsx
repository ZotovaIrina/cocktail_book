import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { AddIngredient } from './src/ingredients/components/AddIngredient'

import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import './src/translate'

export default function App() {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{t('helloWorld')}</Text>
      <AddIngredient />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
