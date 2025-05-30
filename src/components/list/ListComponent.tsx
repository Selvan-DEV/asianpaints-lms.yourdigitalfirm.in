import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ITopic } from "@/models/courses/CoursesModel";
import { Box } from "@mui/material";

export default function AlignItemsList(props: {
  items: ITopic[];
  selectedTopic: number;
  setSelectedTopic: (topicId: number) => void;
}) {
  const { items, selectedTopic, setSelectedTopic } = props;

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
      }}
    >
      {items.map((item: ITopic) => (
        <Box key={item.topicId}>
          <ListItem
            alignItems="flex-start"
            onClick={() => setSelectedTopic(item.topicId)}
            sx={{
              cursor: "pointer",
              alignItems: "center",
              gap: "10px",
              height: "70px",
              marginRight: 0,
              marginBottom: 0,
              padding: 0,
              paddingLeft: "20px",
            }}
          >
            <ListItemIcon
              sx={{
                transform: "scale(1)",
                minWidth: "10px !important",
                marginTop: 0,
              }}
            >
              {item.topicId === selectedTopic ? (
                <SendIcon
                  sx={{
                    color: "var(--app-custom-primary-text-color) !important",
                  }}
                />
              ) : (
                <SendIcon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.topicName}
              secondary={
                <React.Fragment>{item.topicDescription}</React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" sx={{ marginLeft: "0px" }} />
        </Box>
      ))}
    </List>
  );
}
