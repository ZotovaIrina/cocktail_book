import { Unit } from "../../ingredients/types/Unit";
import { Glass } from "../types/Glass";
import { ICoctail } from "../types/ICoctail";
import { Ice } from "../types/Ice";
import { MixMethod } from "../types/MixMethod";

export const coctails: ICoctail[] = [
    {
        id: 'Amaretto Sour',
        name: 'Amaretto Sour',
        ingredients: [{
            ingredientId: 'amaretto',
            amount: 2,
            unit: Unit.Oz
        }],
        tags: [],
        mixMethod: MixMethod.Stirred,
        ice: Ice.LargeCube,
        glass: Glass.Rock
    }
]