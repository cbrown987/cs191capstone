import {IngredientComponent} from "@/app/components/IngredentComponent/IngredientComponent";

export interface CardProps {
    imageSrc: string;
    title: string;
    type: string;
    id: string;
}

export interface MenuLinkProps {
    linkText: string;
    link: string;
    description: string;
    type: string;
}

export interface RecipeComponentProps {
    id: string;
    title: string;
    description: string;
    instructions: string;
    imageURL: string;
    ingredients: any;
    type: string;
}

export interface IngredientComponentProps {
    id: string;
    name: string;
    description: string;
    imageURL: string;
}

export interface SearchBarProps {
  initialQuery?: string;
}
