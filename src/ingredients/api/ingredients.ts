import axios from 'axios'
import { BaseUrl } from '../../api/BaseUrl'
import { IIngredient } from '../types/IIngredient'

const INGREDIENTS_BASE_URL = BaseUrl + '/ingredients'

export const getIngredients = () =>
  axios
    .get<IIngredient[]>(`${INGREDIENTS_BASE_URL}/getAllIngredients`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
      throw Error(error.message)
    })

export const saveIngredient = (ingredient: {
  name: string
  description?: string
}) =>
  axios
    .post<IIngredient>(`${INGREDIENTS_BASE_URL}`, ingredient)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
      throw Error(error.message)
    })
