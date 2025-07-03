import React, { useEffect, useState } from 'react';
import { Note } from './types/Note';
import { getNotes, addNote, deleteNote } from './api/notes';
import NoteItem from './components/NoteItem';
import NoteForm from './components/NoteForm';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const handleAddNote = async (title: string, content: string) => {
    try {
      const newNote = await addNote({ title, content });
      setNotes((prev) => [newNote, ...prev]);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
      <div style={{ padding: '2em' }}>
        <h1>My Notes</h1>
        <NoteForm onAdd={handleAddNote} />
        {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={handleDeleteNote} />
        ))}
      </div>
  );
};

export default App;