import { View, SafeAreaView, StyleSheet, Role } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { TextField } from '../../sharedComponents/TextField'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Button, Text, IconButton } from 'react-native-paper'
import { Notification } from '../../sharedComponents/Notification'
import { PageWrapper } from '../../navigation/PageWrapper'
import { Routes } from '../../navigation/BottomNavigation'
import { saveCocktail } from '../api/cocktails'
import { IIngredientWithAmount } from '../../ingredients/types/IIngredientWithAmount'
import { SelectField } from '../../sharedComponents/SelectField'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IIngredient } from '../../ingredients/types/IIngredient'
import { getIngredients } from '../../ingredients/api/ingredients'

interface AddCocktailForm {
  name: string
  description?: string
  ingredients: IIngredientWithAmount[]
}

export const AddCocktail: FC = () => {
  const { t } = useTranslation()
  const { control, handleSubmit, formState, watch, setValue } =
    useForm<AddCocktailForm>({
      defaultValues: {
        name: '',
        description: '',
        ingredients: [{}],
      },
    })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState<string>('')
  const onSubmit = async (data: AddCocktailForm) => {
    try {
      if (data.ingredients && data.ingredients.length > 0) {
        await saveCocktail({
          name: data.name,
          description: Boolean(data.description) ? data.description : undefined,
          ingredients: data.ingredients,
        })
      }

      setShowSuccessMessage(true)
    } catch (e: any) {
      setShowErrorMessage(e.message)
    }
  }
  const ingredientInputs = watch('ingredients')
  const navigation = useNavigation()

  const [ingredientOptions, setIngredientOptions] = useState<
    { label: string; value: string }[]
  >([])

  useEffect(() => {
    if (navigation.isFocused()) {
      //restore from local storage
      const value = AsyncStorage.getItem('ingredients')
        .then((storedIngredients) => {
          if (storedIngredients) {
            const ingredients = JSON.parse(storedIngredients)
            setIngredientOptions(
              ingredients.map((ingredient: IIngredient) => ({
                label: ingredient.name,
                value: ingredient._id,
              }))
            )
          } else {
            //sync with the server only if here is no data
            getIngredients()
              .then((data) => {
                setIngredientOptions(
                  data.map((ingredient) => ({
                    label: ingredient.name,
                    value: ingredient._id,
                  }))
                )
                AsyncStorage.setItem('ingredients', JSON.stringify(data))
              })
              .catch((e) => setShowErrorMessage(e.message))
          }
        })
        .catch((e) => setShowErrorMessage(e.message))
    }
  }, [])

  return (
    <>
      <PageWrapper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ flex: 1, display: 'flex' }}
        >
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
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
                numberOfLines={4}
              />
              <Text variant="titleMedium">{t('ingredients')}</Text>
              {ingredientInputs.map((ingredient, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <SelectField
                      label={t('ingredients')}
                      options={ingredientOptions}
                      name={`ingredients.${index}._id`}
                      onSelect={(value) =>
                        setValue(`ingredients.${index}._id`, value.value)
                      }
                      control={control}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <TextField
                      label={t('quantity')}
                      name={`ingredients.${index}.quantity`}
                      control={control}
                    />
                  </View>
                  <Text variant="bodyMedium" style={{ flexShrink: 2 }}>
                    {t('oz')}
                  </Text>
                </View>
              ))}
              <IconButton
                mode="contained"
                icon="plus"
                onPress={(e) => {
                  setValue('ingredients', [
                    ...ingredientInputs,
                    {} as IIngredientWithAmount,
                  ])
                }}
              />
            </View>

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
