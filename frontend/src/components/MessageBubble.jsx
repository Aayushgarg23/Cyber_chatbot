import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper sx={{ p: 2, m: 1, background: "#1f2937", color: "white" }}>
        <Typography><b>You:</b> {message.user}</Typography>
        <Typography><b>Bot:</b> {message.bot}</Typography>
      </Paper>
    </motion.div>
  );
}
