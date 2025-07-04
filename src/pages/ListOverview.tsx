import { useEffect, useState } from 'react';
import {
    Button, Container, Grid, Typography, Dialog, DialogTitle, DialogContent, TextField,
    DialogActions, Select, MenuItem
} from '@mui/material';
import { fetchLists, createList, deleteList } from '../api/listApi';
import { List, ListType } from '../types';
import ListCard from '../components/ListCard';
import { useOfflineQueue } from '../hooks/useOfflineQueue';
import { REFRESH_INTERVAL } from "../utility/constants"

export default function ListOverview() {
    const [lists, setLists] = useState<List[]>([]);
    const [open, setOpen] = useState(false);
    const [newList, setNewList] = useState({ name: '', type: 'todo' as ListType });
    const { enqueue, flush } = useOfflineQueue();

    const loadLists = async () => {
        try {
            const res = await fetchLists();
            setLists(res.data);
        } catch {
            await flush(); // try to flush offline queue
        }
    };

    useEffect(() => {
        loadLists();
        const interval = setInterval(loadLists, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const handleCreate = async () => {
        try {
            await createList(newList);
            setOpen(false);
            loadLists();
        } catch {
            enqueue({ fn: createList, args: [newList] });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteList(id);
            loadLists();
        } catch {
            enqueue({ fn: deleteList, args: [id] });
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Shared Lists</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>Create List</Button>
            <Grid container spacing={2} marginTop={2}>
                {(Array.isArray(lists) ? lists : []).map((list) => (
                    <ListCard list={list} onDelete={handleDelete} />
                ))}
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New List</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="dense" onChange={e => setNewList({ ...newList, name: e.target.value })} />
                    <Select fullWidth value={newList.type} onChange={e => setNewList({ ...newList, type: e.target.value as ListType })}>
                        <MenuItem value="todo">To-do List</MenuItem>
                        <MenuItem value="stock">Stock List</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
