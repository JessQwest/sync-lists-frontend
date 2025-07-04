import {
    ListItem, Checkbox, ListItemText, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoItem } from '../types';

export default function ToDoItem({ item, onUpdate, onDelete }: {
    item: TodoItem;
    onUpdate: (item: TodoItem) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <ListItem>
            <Checkbox checked={item.checked} onChange={() => onUpdate({ ...item, checked: !item.checked })} />
            <ListItemText
                primary={item.name}
                sx={{ textDecoration: item.checked ? 'line-through' : 'none' }}
            />
            <IconButton onClick={() => onDelete(item.id)}><DeleteIcon /></IconButton>
        </ListItem>
    );
}
