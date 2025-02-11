import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Đảm bảo rằng Dialogflow Messenger được tải sau khi component được render
    const existingScript = document.querySelector(
      'script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <df-messenger
        intent="WELCOME"
        chat-title="AgentV2-kmart-bot"
        agent-id="TODO need copy my chatbot on google dialogflow"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Chatbot;
