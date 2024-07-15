import { View, SafeAreaView, ScrollView } from 'react-native'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageWrapper } from '../../navigation/PageWrapper'
import { ICocktail } from '../types/ICocktail'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCocktails } from '../api/cocktails'
import { DataTable } from 'react-native-paper'

export const Cocktails: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [cocktails, setCocktails] = useState<ICocktail[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [page, setPage] = useState<number>(0)
  const [numberOfItemsPerPageList] = useState([100, 200, 500])
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  )
  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, cocktails.length)

  useEffect(() => {
    if (navigation.isFocused()) {
      //restore from local storage
      const value = AsyncStorage.getItem('cocktails').then(
        (storedCocktails) => {
          if (storedCocktails) setCocktails(JSON.parse(storedCocktails))
        }
      )
      //sync with the server
      getCocktails()
        .then((data) => {
          setCocktails(data)
          AsyncStorage.setItem('cocktails', JSON.stringify(data))
        })
        .catch((e) => setError(e.message))
    }
  }, [navigation.isFocused()])

  return (
    <PageWrapper>
      <ScrollView testID="scroll" style={{ maxHeight: '90%' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">
              {t('name')}
            </DataTable.Title>
            <DataTable.Title>{t('description')}</DataTable.Title>
          </DataTable.Header>

          {cocktails.slice(from, to).map((cocktail) => (
            <DataTable.Row key={cocktail._id}>
              <DataTable.Cell>{cocktail.name}</DataTable.Cell>
              <DataTable.Cell>{cocktail.description}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(cocktails.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${cocktails.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={''}
      />
    </PageWrapper>
  )
}
