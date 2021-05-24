import { ASC, PAGESIZE } from '../constants';

export const cleanAndFormatMessages = (messages, messageSortOrder) => {
    let newMessages = messages.filter((m, idx, self) =>
        idx ===
        self.findIndex((t) =>
            (t.content === m.content && t.senderUuid === m.senderUuid) ||
            (t.content === m.content && t.uuid === m.uuid)
        )
    )
    return reorderMessages(newMessages, messageSortOrder);
};

export const reorderMessages = (messages, messageSortOrder) => {
  let newMessages = messages.sort((a, b) =>
    messageSortOrder === ASC
      ? new Date(b.sentAt) - new Date(a.sentAt)
      : new Date(a.sentAt) - new Date(b.sentAt)
  );
  // return deep copy
  return JSON.parse(JSON.stringify(newMessages));
};

export const fetchMessages = (messages, page) => {
  let newMessages = JSON.parse(JSON.stringify(messages));
  newMessages.reverse();
  const startOfPage = page * PAGESIZE,
  endOfPage = Math.min(startOfPage + PAGESIZE, newMessages.length);
  return newMessages.slice(startOfPage, endOfPage).reverse();
};

export const deleteMessage = (uuidToDelete, sentAt, messages) => {
  let newMessages = messages;
  let itemIndex = newMessages.findIndex(m => m.uuid === uuidToDelete && m.sentAt === sentAt);
  newMessages.splice(itemIndex, 1);
  return newMessages;
}
