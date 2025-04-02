"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITopic, ITopicContent } from "@/models/courses/CoursesModel";
import { Box } from "@mui/material";
import TopicContent from "../course/Topic/TopicContent";
import { useState } from "react";

export default function TopicContentAccordion(props: {
  items: ITopic[];
  selectedTopicContent: ITopicContent | null;
  isLastTopic: boolean;
  onNext: (topicId: number) => void;
}) {
  const { items, selectedTopicContent, isLastTopic, onNext } = props;

  const [expanded, setExpanded] = useState<number | boolean>(false);

  const handleAccordionChange = (panelId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panelId : false);

    if (isExpanded && !items[panelId]) {
      onNext(panelId);
    }
  };

  return (
    <Box>
      {items &&
        items.length &&
        items.map((item) => (
          <Accordion key={item.topicId} onChange={handleAccordionChange(item.topicId)} expanded={expanded === item.topicId}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{item.topicName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {selectedTopicContent && (
                <TopicContent
                  selectedTopicContent={selectedTopicContent}
                  isLastTopic={isLastTopic}
                  onNext={(e) => onNext(e)}
                />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
