import {
    ListItem, IconButton, ListItemText, Typography
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { StockItem } from '../types';

export default function StockItemComponent({ item, onUpdate, onDelete }: {
    item: StockItem;
    onUpdate: (item: StockItem) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <ListItem>
            <ListItemText primary={item.name} />
            <IconButton onClick={() => onUpdate({ ...item, count: item.count - 1 })}><RemoveIcon /></IconButton>
            <Typography>{item.count}</Typography>
            <IconButton onClick={() => onUpdate({ ...item, count: item.count + 1 })}><AddIcon /></IconButton>
            <IconButton onClick={() => onUpdate({ ...item, flagged: !item.flagged })}>
            <FlagIcon color={item.flagged ? 'error' : 'disabled'} />
            </IconButton>
            <IconButton onClick={() => onDelete(item.id)}><DeleteIcon /></IconButton>
        </ListItem>
);
}
