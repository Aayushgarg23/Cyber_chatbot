import { AppBar, Toolbar, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AppBar position="static" sx={{ background: "#2d2f41" }}>
        <Toolbar>
          <Typography variant="h6">🛡️ CyberSecure AI</Typography>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}
