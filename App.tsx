import { StatusBar } from 'expo-status-bar'
import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import './src/translate'
import { PaperProvider } from 'react-native-paper'
import { BottomNav } from './src/navigation/BottomNavigation'

export default function App() {
  return (
    <PaperProvider>
      <BottomNav />
    </PaperProvider>
  )
}
