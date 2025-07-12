import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { IconButton, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props {
    id: string;
    children: React.ReactNode;
}

const SortableItemWrapper = ({ id, children }: Props) => {
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
        alignItems: 'center',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {/* Drag handle icon */}
            <IconButton {...attributes} {...listeners} edge="start">
                <DragIndicatorIcon />
            </IconButton>

            {/* The rest of the item content */}
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>
        </div>
    );
};

export default SortableItemWrapper;
