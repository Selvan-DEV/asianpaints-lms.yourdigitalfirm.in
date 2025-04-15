import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import AlignItemsList from '@/components/list/ListComponent';
import { ITopic } from '@/models/courses/CoursesModel';

export default function TopicsAccordion(props: {
    items: ITopic[];
    selectedTopic: number;
    setSelectedTopic: (topicId: number) => void;
}) {
    const { items, selectedTopic, setSelectedTopic } = props;
    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Topics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AlignItemsList
                        items={items}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
