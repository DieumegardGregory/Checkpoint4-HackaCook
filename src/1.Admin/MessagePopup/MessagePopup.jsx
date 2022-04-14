import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './MessagePopup.scss';

const MessagePopup = ({ message, opened, setOpened}) => {

  const handleClose = () => {
    setOpened(false);
  }

  useEffect(() => {
      setTimeout(handleClose, 5000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <>
      {opened ? (
        <div className="message-container flex-center-column">
          <p>Chaud devant!</p>
          <div className="countdown-container">
            <div className="countdown"></div>
          </div>
          <p>{message}</p>
        </div>
      ) : null}
    </>
  );
};

MessagePopup.propTypes = {
  message: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
};

export default MessagePopup;
