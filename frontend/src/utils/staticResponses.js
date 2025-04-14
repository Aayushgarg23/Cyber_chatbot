export const getStaticResponse = (message) => {
  const responses = {
    default: "I'm your cybersecurity assistant. How can I help you today?",
    hello: "Hello! I'm here to help you with cybersecurity questions and concerns.",
    security: "Here are key security practices:\n1. Use strong passwords\n2. Enable 2FA\n3. Keep software updated\n4. Use encryption\n5. Regular backups",
    hack: "I can help you understand cybersecurity threats and how to protect against them. What specific area interests you?",
    password: "Strong password tips:\n1. Use at least 12 characters\n2. Mix uppercase and lowercase\n3. Include numbers and symbols\n4. Avoid personal info\n5. Use unique passwords for each account",
    virus: "To protect against viruses:\n1. Use updated antivirus software\n2. Don't click suspicious links\n3. Scan downloads\n4. Keep systems updated",
    protect: "Essential protection measures:\n1. Firewall configuration\n2. Regular updates\n3. Data encryption\n4. Access control\n5. Security monitoring",
  };

  const lowercaseMsg = message.toLowerCase();
  
  // Check for keyword matches
  for (const [key, value] of Object.entries(responses)) {
    if (lowercaseMsg.includes(key)) {
      return value;
    }
  }
  
  return responses.default;
};