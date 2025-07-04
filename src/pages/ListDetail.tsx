import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Container, Typography, IconButton, TextField, Button, List as MUIList
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchList, addItem, deleteItem, updateItem } from '../api/listApi';
import { List, TodoItem, StockItem } from '../types';
import ToDoItem from '../components/ToDoItem';
import StockItemComponent from '../components/StockItem';
import { useOfflineQueue } from '../hooks/useOfflineQueue';

export default function ListDetail() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<List | null>(null);
    const [newItem, setNewItem] = useState('');
    const { enqueue, flush } = useOfflineQueue();

    const load = async () => {
        try {
            const res = await fetchList(id!);
            setList(res.data);
        } catch {
            await flush();
        }
    };

    useEffect(() => {
        load();
        const interval = setInterval(load, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleAdd = async () => {
        const item = list!.type === 'todo' ?
            { name: newItem, checked: false } :
            { name: newItem, count: 0 };
        try {
            await addItem(list!.id, item);
            setNewItem('');
            load();
        } catch {
            enqueue({ fn: addItem, args: [list!.id, item] });
        }
    };

    const handleDelete = async (itemId: string) => {
        try {
            await deleteItem(list!.id, itemId);
            load();
        } catch {
            enqueue({ fn: deleteItem, args: [list!.id, itemId] });
        }
    };

    const handleUpdate = async (item: any) => {
        try {
            await updateItem(list!.id, item);
            load();
        } catch {
            enqueue({ fn: updateItem, args: [list!.id, item] });
        }
    };

    return list ? (
        <Container>
            <Typography variant="h5">{list.name}</Typography>
            <MUIList>
                {(list.items as any[] ?? []).map((item) =>
                    list.type === 'todo' ? (
                        <ToDoItem key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ) : (
                        <StockItemComponent key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    )
                )}
            </MUIList>
            <TextField fullWidth label="New Item" value={newItem} onChange={e => setNewItem(e.target.value)} />
            <Button onClick={handleAdd}>Add</Button>
        </Container>
    ) : null;
}
