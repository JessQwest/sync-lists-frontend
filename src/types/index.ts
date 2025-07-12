export type ListType = 'todo' | 'stock';

export interface BaseItem {
    id: string;
    itemorder: number | null;
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
    itemorder: number | null;
    name: string;
    type: ListType;
    items: TodoItem[] | StockItem[];
}
