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
