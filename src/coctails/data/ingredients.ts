import { Category } from "../types/Category";
import { IIngredient } from "../types/IIngredient";

const Amaretto: IIngredient = {
    id: 'amaretto',
    name: 'Amaretto',
    image: '',
    category: Category.Liqueur
}
const Lemon: IIngredient = {
    id: 'lemon',
    name: 'Lemon',
    image: '',
    category: Category.Fruits,
    alternativesId: ['lemonJuice']
}
const lemonJuice: IIngredient = {
    id: 'lemonJuice',
    name: 'lemonJuice',
    image: '',
    category: Category.Juice,
    alternativesId: ['lemon']
}
const AngosturaBitter: IIngredient = {
    id: 'angosturaBitter',
    name: 'Angostura Bitter',
    image: '',
    category: Category.Bitter,
}
const SugarSyrup: IIngredient = {
    id: 'SugarSyrup',
    name: 'SugarSyrup',
    image: '',
    category: Category.Syrup
}
export const ingredients: IIngredient[] = [
    Amaretto,
    Lemon,
    lemonJuice,
    AngosturaBitter,
    SugarSyrup
]