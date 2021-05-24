import React, { useEffect, useRef } from 'react';

export default function OnLoadScrollToTop({ currentEnd }) {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView();
    setTimeout(() => {
      document.getElementById('chat-messages').scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 300);
  }, [currentEnd]);
  return <div ref={elementRef} />;
};
