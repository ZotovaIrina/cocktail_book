import { Text, RadioButton } from 'react-native-paper'
import { FC } from 'react'
import { PageWrapper } from '../navigation/PageWrapper'
import { useTranslation } from 'react-i18next'

export type Languages = 'en' | 'ru'

export const Settings: FC = () => {
  const { t, i18n } = useTranslation()
  const changeLanguageHandler = (lang: Languages) => {
    i18n.changeLanguage(lang)
    i18n.language
  }

  return (
    <PageWrapper>
      <Text variant="titleLarge">{t('settings.changeLanguage')}</Text>
      <RadioButton.Group
        onValueChange={(value: string) =>
          changeLanguageHandler(value as Languages)
        }
        value={i18n.language}
      >
        <RadioButton.Item label={t('settings.en')} value="en" />
        <RadioButton.Item label={t('settings.ru')} value="ru" />
      </RadioButton.Group>
    </PageWrapper>
  )
}
