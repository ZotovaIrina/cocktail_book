import axios from 'axios'
import { BaseUrl } from '../../api/BaseUrl'
import { ICocktail } from '../types/ICocktail'
import { IIngredientWithAmount } from '../../ingredients/types/IIngredientWithAmount'

const COCKTAILS_BASE_URL = BaseUrl + '/cocktails'

export const getCocktails = () =>
  axios
    .get<ICocktail[]>(`${COCKTAILS_BASE_URL}/getAllCocktails`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
      throw Error(error.message)
    })

export const saveCocktail = (cocktail: {
  name: string
  description?: string
  ingredients: IIngredientWithAmount[]
}) =>
  axios
    .post<ICocktail>(`${COCKTAILS_BASE_URL}`, cocktail)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
      throw Error(error.message)
    })
