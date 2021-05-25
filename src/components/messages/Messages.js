import React, { Fragment, useState, useEffect, useRef } from 'react';
// Components
import Message from './Message';
import OnLoadScrollToTop from './OnLoadScrollToTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// Data
import { PAGESIZE } from '../../constants';

export default function Messages({ messages, handleDeleteButton }) {
  const [loading, setLoading] = useState(false);
  const [currentEnd, setCurrentEnd] = useState(5);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  function isScrolling() {
    let chatMessagesElement = document.getElementById('chat-messages');
    if (chatMessagesElement.scrollTop === 0 && (chatMessagesElement.scrollHeight > chatMessagesElement.offsetHeight)) {
      console.log("scrolling up");
      setIsFetching(true);
    } else {
      return;
    }
  }

  useEffect(() => {
    if (isFetching)
      loadMore();
  }, [isFetching]);

  useEffect(() => {
    let chatMessagesElement = document.getElementById('chat-messages');
    chatMessagesElement.addEventListener("scroll", isScrolling);
    return () => chatMessagesElement.removeEventListener("scroll", isScrolling);
  }, []);

  const loadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setPage(page + 1);
      setCurrentEnd(Math.min(currentEnd + PAGESIZE, messages.length));
      setLoading(false);
      setIsFetching(false);
    }, 500);
  };

  return (
    <div id="chat-messages" className="chat-messages">
      <div className="loading-container">
        {loading ? <span className="loading-icon"><FontAwesomeIcon icon={faCircleNotch} spin /></span> : null}
        {!loading && currentEnd < messages.length
          ? <button className="modal-cancel" onClick={loadMore}>Load More <FontAwesomeIcon icon={faArrowUp} /></button>
          : null }
      </div>
      {messages.slice(0, currentEnd).reverse().map((m, key) =>
          <Fragment key={key}>
            {(key === (currentEnd - page * PAGESIZE - 5)) ? <OnLoadScrollToTop currentEnd={currentEnd} /> : null}
            <Message
              content={m.content}
              senderUuid={m.senderUuid}
              sentAt={m.sentAt}
              uuid={m.uuid}
              handleDeleteButton={handleDeleteButton}
            />
          </Fragment>
      )}
    </div>
  )
};
