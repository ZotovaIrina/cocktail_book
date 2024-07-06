import { View, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { TextField } from '../../sharedComponents/TextField'
import { useTranslation } from 'react-i18next'
import { SelectField } from '../../sharedComponents/SelectField'
import { useForm } from 'react-hook-form'

export const AddIngredient = () => {
  const { t } = useTranslation()
  const [text, onChangeText] = React.useState('Useless Text')
  const { register, handleSubmit } = useForm<{
    ingredientName: string
    category: string
  }>({
    defaultValues: {
      ingredientName: '',
      category: '',
    },
  })

  const [number, onChangeNumber] = React.useState('')
  return (
    <View>
      <SafeAreaView>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <TextField
            label={t('name')}
            {...register('ingredientName')}
          />
          <SelectField
            label={t('category')}
            options={[
              {
                label: 'label',
                value: 'value',
              },
            ]}
            onSelect={() => {}}
          />
        </form>
      </SafeAreaView>
    </View>
  )
}
