import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  return (
    <Box sx={{ p: 2, overflowY: "auto", height: "60vh" }}>
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
    </Box>
  );
}
