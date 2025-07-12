import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Container, Typography, TextField, Button, List as MUIList
} from '@mui/material';
import { fetchList, addItem, deleteItem, updateItem, reorderItems } from '../api/listApi'
import { List, BaseItem, TodoItem, StockItem } from '../types'
import ToDoItem from '../components/ToDoItem';
import StockItemComponent from '../components/StockItem';
import { useOfflineQueue } from '../hooks/useOfflineQueue';
import { REFRESH_INTERVAL } from "../utility/constants"
import { capitalizeFirstLetter } from "../utility/functions"

import {
    DndContext,
    closestCenter,
    DragEndEvent,
} from '@dnd-kit/core';

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';

import SortableItemWrapper from '../components/SortableItemWrapper'; // See below for this

export default function ListDetail() {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<List | null>(null);
    const [newItem, setNewItem] = useState('');
    const { enqueue, flush } = useOfflineQueue();
    const navigate = useNavigate();

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
        const interval = setInterval(load, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [load]);

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

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = list!.items.findIndex(item => item.id === active.id);
        const newIndex = list!.items.findIndex(item => item.id === over.id);

        const newItems = arrayMove(list!.items as TodoItem[], oldIndex, newIndex);
        const newOrder = newItems.map(item => item.id);

        setList({ ...list!, items: newItems });

        // ✅ Your custom function call with new order
        console.log('New order:', newOrder);
        console.log('List ID:', list!.id);

        await reorderItems(list!.id, newOrder)
    };

    return list ? (
        <Container>
            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            <Typography variant="h5">{list.name} - {capitalizeFirstLetter(list.type)} List</Typography>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={list.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <MUIList>
                        {(list.items as BaseItem[]).map((item) => (
                            <SortableItemWrapper key={item.id} id={item.id}>
                                {list.type === 'todo' ? (
                                    <ToDoItem item={item as TodoItem} onUpdate={handleUpdate} onDelete={handleDelete} />
                                ) : (
                                    <StockItemComponent item={item as StockItem} onUpdate={handleUpdate} onDelete={handleDelete} />
                                )}
                            </SortableItemWrapper>
                        ))}
                    </MUIList>
                </SortableContext>
            </DndContext>

            <TextField fullWidth label="New Item" value={newItem} onChange={e => setNewItem(e.target.value)} />
            <Button onClick={handleAdd}>Add</Button>
        </Container>
    ) : null;
}
