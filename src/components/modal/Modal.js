import React from 'react';

export default function Modal({ confirmAction, cancelAction }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="modal-header">Remove for you</h2>
        <div className="modal-close" onClick={cancelAction}>X</div>
        <p className="modal-description">This message will be removed for you. Other chat members will still be able to see it.</p>
        <footer className="modal-footer">
          <button className="modal-cancel" onClick={cancelAction}>Cancel</button>
          <button className="modal-confirm" onClick={confirmAction}>Remove</button>
        </footer>
      </div>
    </div>
  );
}
