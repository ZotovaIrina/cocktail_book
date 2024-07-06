import { View, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { TextField } from '../../sharedComponents/TextField'
import { useTranslation } from 'react-i18next'
import { SelectField } from '../../sharedComponents/SelectField'
import { useForm } from 'react-hook-form'
import { TopNavigation } from '../../navigation/TopNavigation'
import { Category } from '../types/Category'

export const AddIngredient: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { t } = useTranslation()
  const [text, onChangeText] = React.useState('Useless Text')
  const { register, handleSubmit } = useForm<{
    ingredientName: string
    description?: string
    category?: Category
  }>({
    defaultValues: {
      ingredientName: ''
    },
  })

  const [number, onChangeNumber] = React.useState('')
  return (
    <View>
      <SafeAreaView>
        <TopNavigation navigation={navigation} />
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <TextField label={t('name')} {...register('ingredientName')} />
          <TextField label={t('name')} {...register('description')} />
          {/* <SelectField
            label={t('category')}
            options={[
              {
                label: 'label',
                value: 'value',
              },
            ]}
            onSelect={() => {}}
          /> */}
        </form>
      </SafeAreaView>
    </View>
  )
}
