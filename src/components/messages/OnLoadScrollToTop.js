import React, { useEffect, useRef } from 'react';

export default function OnLoadScrollToTop({ currentEnd }) {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [currentEnd]);
  return <div ref={elementRef} />;
};
