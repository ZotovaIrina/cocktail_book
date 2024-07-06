import { View, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'
import { TopNavigation } from '../../navigation/TopNavigation'
import { getIngredients } from '../../api/ingredients'
import { IIngredient } from '../types/IIngredient'
import { DataTable } from 'react-native-paper'

export function Ingredients({ navigation }: { navigation: any }) {
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
      getIngredients()
        .then((data) => setIngredients(data))
        .catch((e) => setError(e.message))
    }
  }, [navigation.isFocused()])
  
  return (
    <View>
      <SafeAreaView>
        <TopNavigation navigation={navigation} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">Name</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
          </DataTable.Header>

          {ingredients.slice(from, to).map((ingredient) => (
            <DataTable.Row key={ingredient._id}>
              <DataTable.Cell>{ingredient.name}</DataTable.Cell>
              <DataTable.Cell>{ingredient.description}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(ingredients.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${ingredients.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </SafeAreaView>
    </View>
  )
}
