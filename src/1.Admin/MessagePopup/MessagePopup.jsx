import React from 'react';
import PropTypes from 'prop-types';
import './MessagePopup.scss';

const MessagePopup = ({ message, opened}) => {

  return (
    <>
      {opened ? (
        <div className="message-container flex-center-column">
          <p>Chaud devant!</p>
          <p>{message}</p>
        </div>
      ) : null}
    </>
  );
};

MessagePopup.propTypes = {
  message: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
};

export default MessagePopup;
