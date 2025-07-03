import React from 'react';
import { Note } from '../types/Note';

interface Props {
    note: Note;
    onDelete: (id: string) => void;
}

const NoteItem: React.FC<Props> = ({ note, onDelete }) => (
    <div style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
);

export default NoteItem;
