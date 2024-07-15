import { Glass } from './Glass'
import { Ice } from './Ice'
import { IIngredientWithAmount } from '../../ingredients/types/IIngredientWithAmount'
import { MixMethod } from './MixMethod'

export interface ICocktail {
  _id: string
  name: string
  description?: string
  tags: string[]
  ingredients: IIngredientWithAmount[]
  garnish?: []
  mixMethod: MixMethod
  notes?: string
  glass: Glass
  ice: Ice
}
