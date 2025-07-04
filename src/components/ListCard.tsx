import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { List } from '../types';

export default function ListCard({
                                     list,
                                     onDelete
                                 }: {
    list: List;
    onDelete: (id: string) => void;
}) {
    const navigate = useNavigate();

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{list.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {list.type === 'todo' ? 'To-Do List' : 'Stock List'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/list/${list.id}`)}>
                    View
                </Button>
                <IconButton aria-label="delete" onClick={() => onDelete(list.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
