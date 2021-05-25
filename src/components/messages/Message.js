import React from 'react';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Data
import { CURR_USER_ID } from '../../constants';

export default function Message({ content, senderUuid, sentAt, uuid, handleDeleteButton }) {
  const dateOptions = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
  let formattedDate = new Date(sentAt).toLocaleDateString(undefined, dateOptions);
  let messageType = (senderUuid === CURR_USER_ID) ? 'sender' : 'recipient';
  return (
    <div className={`chat-message ${messageType}`}>
      <p className={`message-content ${messageType}`}>{content}</p>
      <p className="message-timestamp">{formattedDate}</p>
      <div className="message-delete">
          <span onClick={()=>handleDeleteButton({uuid: uuid, sentAt: sentAt})}><FontAwesomeIcon icon={faTrash} /></span>
      </div>
    </div>
  );
};
