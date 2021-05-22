import React from 'react';

export default function Message({ content, senderUuid, sentAt, uuid }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p>{content}</p>
      <p>{senderUuid}</p>
      <p>{sentAt}</p>
      <p>{uuid}</p>
    </div>
  );
}
