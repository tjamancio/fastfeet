import React, { createRef, useState } from 'react';

import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Modal({ children, onCloseClick }) {
  const contentRef = createRef();

  function removeListener() {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', handleKeyPress, false);
  }

  function handleKeyPress(event) {
    if (event.keyCode === 27) {
      removeListener();
      onCloseClick();
    }
  }

  useState(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {};
  }, []);

  function handleModalClick(event) {
    if (!event.target.closest('#modal-content')) {
      onCloseClick();
      removeListener();
    }
  }

  return (
    <Container
      tabIndex={0}
      onClick={handleModalClick}
      onKeyDown={handleKeyPress}
    >
      <Content id="modal-content" ref={contentRef}>
        {children}
      </Content>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};
