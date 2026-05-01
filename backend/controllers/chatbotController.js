const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please provide a message." });
    }

    const lowerMessage = message.toLowerCase();
    let reply = "I'm SkillSwap AI! I'm currently running in offline demo mode. I can still help you with basic questions about the platform!";

    // Simple keyword matching for mock responses
    if (lowerMessage.includes("react")) {
      reply = "React is a great skill! I recommend going to the 'Dashboard' and searching for peers who have listed 'React' under 'Skills They Can Teach'.";
    } else if (lowerMessage.includes("placement") || lowerMessage.includes("job")) {
      reply = "For placements, I highly recommend learning Data Structures & Algorithms, React, Node.js, and Cloud basics. You can find mentors for all of these on SkillSwap!";
    } else if (lowerMessage.includes("how does") || lowerMessage.includes("work")) {
      reply = "SkillSwap is simple: you list skills you want to learn, and skills you can teach. Then, you find a peer with complementary skills, send them a Swap Request, and start learning together!";
    } else if (lowerMessage.includes("improve my profile")) {
      reply = "To improve your profile, go to the Profile page and make sure you add a profile picture, write a descriptive bio, and list at least 3 skills you can teach and 3 you want to learn.";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      reply = "Hello there! How can I help you with your learning goals today?";
    }

    // Small delay to simulate AI thinking
    setTimeout(() => {
      res.json({ reply });
    }, 1000);

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting to my brain right now. Please try again later!" });
  }
};

module.exports = {
  askChatbot
};
