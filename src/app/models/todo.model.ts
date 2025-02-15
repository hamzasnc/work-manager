export interface Todo {
    id: number;
    category: string;
    cards: Card[];
}

export interface Card {
    id: number;
    text: string;
    completed: boolean;
    description?: string;
}
