import axios from 'axios';
import { List } from '../types';

const API = "http://192.168.1.253:2081";

export const fetchLists = () => axios.get<List[]>(`${API}/lists`);
export const fetchList = (id: string) => axios.get<List>(`${API}/lists/${id}`);
export const createList = (list: Partial<List>) => axios.post(`${API}/lists`, list);
export const deleteList = (id: string) => axios.delete(`${API}/lists/${id}`);
export const addItem = (listId: string, item: any) => axios.post(`${API}/lists/${listId}/items`, item);
export const updateItem = (listId: string, item: any) => axios.put(`${API}/lists/${listId}/items/${item.id}`, item);
export const deleteItem = (listId: string, itemId: string) => axios.delete(`${API}/lists/${listId}/items/${itemId}`);
