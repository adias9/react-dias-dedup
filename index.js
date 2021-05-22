import React from 'react';
import { render } from 'react-dom';
import './style.css';

// External Components
import Message from './components/Message';

// This is the list of messages.
import { messages } from './data.json';

function App() {
  console.log('messages: ', messages);
  const filteredMessages = messages.filter(
    (m, idx, self) =>
      idx ===
      self.findIndex(
        t =>
          (t.content === m.content && t.senderUuid === m.senderUuid) ||
          (t.content === m.content && t.uuid === m.uuid)
      )
  );
  console.log('filteredMessages: ', filteredMessages);

  return filteredMessages.map(m => (
    <Message
      content={m.content}
      senderUuid={m.senderUuid}
      sentAt={m.sentAt}
      uuid={m.uuid}
    />
  ));
}

render(<App />, document.getElementById('root'));
