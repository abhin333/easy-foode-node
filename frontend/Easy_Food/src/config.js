// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import Feedback from './wedget/Feedback';
import OverView from './wedget/OverView';
import MyAvatar from './wedget/MyAvatar';



const botName = 'ABbot';


let config = {
  botName: botName,
  
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName} I’m here to help you`)],
  widgets: [
    {
      widgetName: 'start',
      widgetFunc: (props) => OverView({...props}),
    },
    {
      widgetName: 'feedback',
      widgetFunc: (props) => Feedback({...props}),
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  customComponents: {
    botAvatar: (props) => MyAvatar({...props}),
  }
  
};


export default config;
