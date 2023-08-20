import { Glass } from "../types/Glass";
import { ICoctail } from "../types/ICoctail";
import { Ice } from "../types/Ice";
import { MixMethod } from "../types/MixMethod";
import { Unit } from "../types/Unit";

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
        mixMethod: MixMethod.StearOnTopOfTheIce,
        ice: Ice.LargeCube,
        glass: Glass.Rock
    }
]