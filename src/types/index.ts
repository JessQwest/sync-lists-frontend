export type ListType = 'todo' | 'stock';

export interface BaseItem {
    id: string;
    name: string;
}

export interface TodoItem extends BaseItem {
    checked: boolean;
}

export interface StockItem extends BaseItem {
    count: number;
    flagged?: boolean;
}

export interface List {
    id: string;
    name: string;
    type: ListType;
    items: TodoItem[] | StockItem[];
}
