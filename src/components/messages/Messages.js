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

  // const handleObserver = (entities, observer) => {
  //   const y = entities[0].boundingClientRect.y;
  //   console.log("observing: ", y);
  //   if (prevY > y) {
  //     const lastMessage = chatMessages[chatMessages.length - 1];
  //     const curPage = Math.ceil(lastMessage / PAGESIZE) - 1;
  //     getMessages(curPage);
  //     setPage(curPage);
  //   }
  //   setPrevY(y);
  // };

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1.0
  //   };
  //   const observer = new IntersectionObserver(
  //     handleObserver,
  //     options
  //   );
  //   if (loadingRef.current)
  //     observer.observe(loadingRef.current);
  // }, [loadingRef]);

  const loadMore = (e) => {
    setLoading(true);

    setTimeout(() => {
      setPage(page + 1);
      setCurrentEnd(Math.min(currentEnd + PAGESIZE, messages.length));
      setLoading(false);
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
