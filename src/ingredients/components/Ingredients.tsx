import { View, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { TopNavigation } from '../../navigation/TopNavigation'
import { getIngredients } from '../../api/ingredients'
import { IIngredient } from '../types/IIngredient'
import { DataTable } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'
import { AddButton } from '../../navigation/AddButton'
import { PageWrapper } from '../../navigation/PageWrapper'

export function Ingredients({ navigation }: { navigation: any }) {
  const { t } = useTranslation()
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [page, setPage] = useState<number>(0)
  const [numberOfItemsPerPageList] = useState([100, 200, 500])
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  )
  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, ingredients.length)

  useEffect(() => {
    if (navigation.isFocused()) {
      //restore from local storage
      const value = AsyncStorage.getItem('ingredients').then(
        (storedIngredients) => {
          if (storedIngredients) setIngredients(JSON.parse(storedIngredients))
        }
      )
      //sync with the server
      getIngredients()
        .then((data) => {
          setIngredients(data)
          AsyncStorage.setItem('ingredients', JSON.stringify(data))
        })
        .catch((e) => setError(e.message))
    }
  }, [navigation.isFocused()])

  return (
    <>
      <PageWrapper>
        <ScrollView testID="scroll" style={{ maxHeight: '90%' }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title sortDirection="descending">
                {t('name')}
              </DataTable.Title>
              <DataTable.Title>{t('description')}</DataTable.Title>
            </DataTable.Header>

            {ingredients.slice(from, to).map((ingredient) => (
              <DataTable.Row key={ingredient._id}>
                <DataTable.Cell>{ingredient.name}</DataTable.Cell>
                <DataTable.Cell>{ingredient.description}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(ingredients.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${ingredients.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={''}
        />

        <AddButton navigation={navigation} />
      </PageWrapper>
    </>
  )
}
