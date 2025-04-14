import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const quizData = [
  { question: "What does CIA stand for?", answer: "Confidentiality, Integrity, Availability" },
  { question: "What is Social Engineering?", answer: "Manipulating individuals to gain confidential information." },
  { question: "What is a DDoS attack?", answer: "Distributed Denial of Service attack, overwhelming a service." },
  { question: "What is the purpose of a VPN?", answer: "To create a secure connection over a less secure network." },
  { question: "What is Phishing?", answer: "Fraudulent attempts to obtain sensitive information." },
  { question: "What is Two-Factor Authentication?", answer: "An extra layer of security requiring two types of credentials." },
  { question: "What is Malware?", answer: "Software designed to harm or exploit any programmable device." },
  { question: "What is Ransomware?", answer: "Malware that locks or encrypts data until a ransom is paid." },
  { question: "What is Encryption?", answer: "Converting data into a code to prevent unauthorized access." },
  { question: "What is a Firewall?", answer: "A network security device that monitors and filters incoming and outgoing traffic." },
  { question: "What is a Zero-Day Vulnerability?", answer: "A security flaw unknown to those who should fix it." },
  { question: "What is Ethical Hacking?", answer: "Legally breaking into computers to test defenses." },
];

const CyberCard = () => {
  const [visibleCards, setVisibleCards] = useState(4);

  const handleLoadMore = () => {
    setVisibleCards((prev) => Math.min(prev + 4, quizData.length));
  };

  return (
    <Box sx={{ py: 4, textAlign: "center" }}>
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          background: "linear-gradient(45deg, #8a2be2, #00ffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 600,
        }}
      >
        Test Your Cyber Knowledge
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "32px", // spacing between cards
          mb: 4,
        }}
      >
        {quizData.slice(0, visibleCards).map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "280px",
              height: "260px",
              perspective: "1000px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "transform 0.8s",
                transformStyle: "preserve-3d",
                "&:hover": {
                  transform: "rotateY(180deg)",
                },
              }}
            >
              {/* Front Side */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "2px solid rgba(0,255,255,0.5)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "18px",
                  boxShadow: "0 0 10px rgba(0,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {item.question}
              </Box>

              {/* Back Side */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "2px solid rgba(255,0,255,0.5)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "18px",
                  boxShadow: "0 0 10px rgba(255,0,255,0.7)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {item.answer}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {visibleCards < quizData.length && (
        <Button
          variant="outlined"
          onClick={handleLoadMore}
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.3)",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.5)",
              bgcolor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default CyberCard;
