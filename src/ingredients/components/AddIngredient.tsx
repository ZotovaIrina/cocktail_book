import { View, SafeAreaView, StyleSheet, Role } from 'react-native'
import React, { FC, useState } from 'react'
import { TextField } from '../../sharedComponents/TextField'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { TopNavigation } from '../../navigation/TopNavigation'
import { Category } from '../types/Category'
import { Button } from 'react-native-paper'
import { saveIngredient } from '../../api/ingredients'
import { Notification } from '../../sharedComponents/Notification'
import { Routes } from '../../../App'

interface AddIngredientForm {
  ingredientName: string
  description?: string
  category?: Category
}

export const AddIngredient: FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation()
  const [text, onChangeText] = useState('Useless Text')
  const { control, handleSubmit, formState } = useForm<AddIngredientForm>({
    defaultValues: {
      ingredientName: '',
      description: '',
    },
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState<string>('')
  const onSubmit = async (data: AddIngredientForm) => {
    try {
      await saveIngredient({
        name: data.ingredientName,
        description: Boolean(data.description) ? data.description : undefined,
      })
      setShowSuccessMessage(true)
    } catch (e: any) {
      setShowErrorMessage(e.message)
    }
  }

  return (
    <View>
      <SafeAreaView>
        <TopNavigation navigation={navigation} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('name')}
            name="ingredientName"
            control={control}
          />
          <TextField
            label={t('description')}
            name="description"
            control={control}
          />
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
          <Button
            mode="contained"
            loading={formState.isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {t('save')}
          </Button>
        </form>
        {showSuccessMessage && (
          <Notification
            notification="Success"
            onDismiss={navigation.push(Routes.Ingredients)}
          />
        )}
        {showErrorMessage && (
          <Notification
            notification={showErrorMessage}
            onDismiss={() => setShowErrorMessage('')}
          />
        )}
      </SafeAreaView>
    </View>
  )
}
