// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {

    const newMessage = message.toLowerCase();
    if (newMessage.includes('hi')) {
      actions.handleHello();
      actions.userName();
    }
  
   
   
   
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;