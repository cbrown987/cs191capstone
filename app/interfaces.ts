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

export interface ChatbotProps {
    height?: string;
    context?: string;
}

export type MenuItem = {
  id: string;
  name: string;
  description: string;
};

export type MenuData = {
  food: MenuItem[];
  drinks: MenuItem[];
};
