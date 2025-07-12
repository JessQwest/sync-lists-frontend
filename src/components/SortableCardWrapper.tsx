import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, IconButton, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props {
    id: string;
    children: React.ReactNode;
}

const SortableCardWrapper = ({ id, children }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div ref={setNodeRef} style={{
            transform: CSS.Transform.toString(transform),
            transition,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box display="flex" alignItems="center">
                <IconButton {...attributes} {...listeners}>
                    <DragIndicatorIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    {children}
                </Box>
            </Box>
        </div>
    );
};

export default SortableCardWrapper;
