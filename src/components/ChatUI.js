import React, { useState, useEffect } from 'react';

// Components
import Modal from './modal/Modal';
import Messages from './messages/Messages';

// Helper Functions
import {
  cleanAndFormatMessages,
  reorderMessages,
  deleteMessage
} from '../helpers/messageHelpers';

// Data
import { ASC, DESC } from '../constants';
import { messages as inputData } from '../assets/data.json';

export default function ChatUI() {
  const [messageSortOrder, setMessageSortOrder] = useState(ASC);
  const [messages, setMessages] = useState(cleanAndFormatMessages(inputData, messageSortOrder));
  const [showModal, setShowModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const handleDeleteButton = (m) => {
    setShowModal(true);
    setMessageToDelete(m);
  };
  const completeDeleteAction = () => {
    setMessages(deleteMessage(messageToDelete.uuid, messageToDelete.sentAt, messages));
    setShowModal(false);
  };

  useEffect(() => {
    setMessages(reorderMessages(messages, messageSortOrder));
  }, [messageSortOrder]);

  return (
    <div className="chat-ui-container">
      {showModal
        ? <Modal
            confirmAction={completeDeleteAction}
            cancelAction={()=>setShowModal(false)}
          />
        : null}
      <ChatHeader
        setMessageSortOrder={setMessageSortOrder}
        messageSortOrder={messageSortOrder}
      />
      <Messages
        messages={messages}
        handleDeleteButton={handleDeleteButton}
      />
      <footer>Message Sending Area</footer>
    </div>
  );
};

function ChatHeader({ setMessageSortOrder, messageSortOrder }) {
  return (
    <header>
      <h1>Modern Health Chat</h1>
      <label>
        Ordered By:&nbsp;
        <button onClick={()=>setMessageSortOrder(messageSortOrder === DESC ? ASC : DESC)}>{messageSortOrder}</button>
      </label>
    </header>
  );
}
