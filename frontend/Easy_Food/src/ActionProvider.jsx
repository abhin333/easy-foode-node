// in ActionProvider.jsx
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage(' Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const userName=()=>{
   
    const botMessage = createChatBotMessage(`how can i help you`,{widget:"start"});
   
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
      
  };
  const IntialAction = () => {
    const botMessage = createChatBotMessage("Let's go these website and purchase what you want");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const intialPayment = () => {
    const botMessage = createChatBotMessage("Don't worry you can use upi or offline... ");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const feedBack=()=>{
    const botMessage = createChatBotMessage(" Are you enjoy our site experience YES or NO ?",{widget:"feedback"});

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  const yes=()=>{
    const botMessage = createChatBotMessage(" thanku for your feedback  😍");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  const no=()=>{
    const botMessage = createChatBotMessage(" thanku for your feedback 😈! next time you will like our web site.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  
  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            userName,
            IntialAction,
            intialPayment,
            feedBack,
            yes,
            no,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;