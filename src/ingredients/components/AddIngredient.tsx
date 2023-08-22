import { View, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { TextField } from '../../sharedComponents/TextField'
import { useTranslation } from 'react-i18next'
import { SelectField } from '../../sharedComponents/SelectField'

export const AddIngredient = () => {
  const { t } = useTranslation()
  const [text, onChangeText] = React.useState('Useless Text')

  const [number, onChangeNumber] = React.useState('')
  return (
    <View>
      <SafeAreaView>
        <TextField
          label={t('name')}
          onChange={(val) => onChangeText(val || '')}
          value={text}
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
      </SafeAreaView>
    </View>
  )
}
