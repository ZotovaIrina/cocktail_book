import { string } from "yargs";
import { Category } from "./Category";

export interface IIngredient {
    id: string;
    image: string
    name: string
    category: Category
    alternativesId?: string[]
}

