import { Glass } from "./Glass"
import { Ice } from "./Ice"
import { IIngredientWithAmount } from "./IIngredientWithAmount"
import { MixMethod } from "./MixMethod"

export interface ICoctail {
    id: string
    name: string
    tags: string[]
    ingredients: IIngredientWithAmount[],
    garnish?: []
    mixMethod: MixMethod
    notes?: string
    glass: Glass,
    ice: Ice
}


