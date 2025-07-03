import axios from 'axios';
import { Note } from '../types/Note';

const API_URL = 'http://192.168.1.69:8080/notes';

export const getNotes = async (): Promise<Note[]> => {
    const response = await axios.get<Note[]>(API_URL);
    return response.data;
};

export const addNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
    const response = await axios.post<Note>(API_URL, note);
    return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
