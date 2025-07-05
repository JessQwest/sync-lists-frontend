import {
    ListItem, IconButton, ListItemText, TextField, Typography
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { StockItem } from '../types';

export default function StockItemComponent({ item, onUpdate, onDelete }: {
    item: StockItem;
    onUpdate: (item: StockItem) => void;
    onDelete: (id: string) => void;
}) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(item.name);
    const [isEditingCount, setIsEditingCount] = useState(false);
    const [editedCount, setEditedCount] = useState(item.count);

    const handleNameBlur = () => {
        if (editedName !== item.name) {
            onUpdate({ ...item, name: editedName });
        }
        setIsEditingName(false);
    };

    const handleNameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNameBlur();
        }
    };

    const handleCountBlur = () => {
        if (editedCount !== item.count) {
            onUpdate({ ...item, count: editedCount });
        }
        setIsEditingCount(false);
    };

    const handleCountKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCountBlur();
        }
    };

    return (
        <ListItem>
            {isEditingName ? (
                <TextField
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    autoFocus
                    fullWidth
                />
            ) : (
                <ListItemText
                    primary={item.name}
                    onClick={() => {
                        setIsEditingName(true)
                        setEditedName(item.name);
                    }}
                />
            )}
            <IconButton onClick={() => onUpdate({ ...item, count: item.count - 1 })}><RemoveIcon /></IconButton>
            {isEditingCount ? (
                <TextField
                    type="number"
                    value={editedCount}
                    onChange={(e) => setEditedCount(Number(e.target.value))}
                    onBlur={handleCountBlur}
                    onKeyDown={handleCountKeyDown}
                    autoFocus
                    sx={{ width: 80 }}
                />
            ) : (
                <Typography onClick={() => {
                    setIsEditingCount(true)
                    setEditedCount(item.count);
                }}>{item.count}</Typography>
            )}
            <IconButton onClick={() => onUpdate({ ...item, count: item.count + 1 })}><AddIcon /></IconButton>
            <IconButton onClick={() => onUpdate({ ...item, flagged: !item.flagged })}>
                <FlagIcon color={item.flagged ? 'error' : 'disabled'} />
            </IconButton>
            <IconButton onClick={() => onDelete(item.id)}><DeleteIcon /></IconButton>
        </ListItem>
    );
}