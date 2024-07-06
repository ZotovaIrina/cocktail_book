import { string } from 'yargs'
import { Category } from './Category'

export interface IIngredient {
  _id: string
  image?: string
  name: string
  description?: string
  category?: Category
  alternativesId?: string[]
  _v: number
}
