import {
    ListItem, Checkbox, TextField, IconButton, ListItemText, Box, Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { TodoItem } from '../types';

export default function ToDoItem({ item, onUpdate, onDelete }: {
    item: TodoItem;
    onUpdate: (item: TodoItem) => void;
    onDelete: (id: string) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item.name);

    const handleBlur = () => {
        if (editedName !== item.name) {
            onUpdate({ ...item, name: editedName });
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <ListItem>
            {!item.name.startsWith('-') && (<Checkbox checked={item.checked} onChange={() => onUpdate({...item, checked: !item.checked})}/>)}
            {isEditing ? (
                <TextField
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    fullWidth
                />
            ) : (
                <ListItemText
                    primary={
                        item.name.startsWith('-') ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: '3px',
                                        backgroundColor: 'grey.800',
                                        mr: 1,
                                    }}
                                />
                                <Typography
                                    component="span"
                                    sx={{ textAlign: 'center',
                                        fontWeight: 'bold',
                                        textDecoration: item.checked ? 'line-through' : 'none'
                                }}
                                >
                                    {item.name.replace(/^[-\s]+/, '')}
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: '3px',
                                        backgroundColor: 'grey.800',
                                        ml: 1,
                                    }}
                                />
                            </Box>
                        ) : (
                            <Typography>{item.name}</Typography>
                        )
                    }
                    onClick={() => {
                        setIsEditing(true)
                        setEditedName(item.name);
                    }}
                />
            )}
            <IconButton onClick={() => onDelete(item.id)}><DeleteIcon /></IconButton>
        </ListItem>
    );
}