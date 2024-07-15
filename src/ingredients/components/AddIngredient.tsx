import { View, SafeAreaView, StyleSheet, Role } from 'react-native'
import React, { FC, useState } from 'react'
import { TextField } from '../../sharedComponents/TextField'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Category } from '../types/Category'
import { Button } from 'react-native-paper'
import { saveIngredient } from '../api/ingredients'
import { Notification } from '../../sharedComponents/Notification'
import { PageWrapper } from '../../navigation/PageWrapper'
import { Routes } from '../../navigation/BottomNavigation'

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
    <>
      <PageWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <View style={{ gap: 12 }}>
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
          </View>
        </form>
      </PageWrapper>
      {showSuccessMessage && (
        <Notification
          notification="Success"
          onDismiss={() => navigation.push(Routes.Ingredients)}
        />
      )}
      {showErrorMessage && (
        <Notification
          notification={showErrorMessage}
          onDismiss={() => setShowErrorMessage('')}
        />
      )}
    </>
  )
}
