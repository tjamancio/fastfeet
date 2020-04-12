import React from 'react';

import PropTypes from 'prop-types';

import { Container, BackgroundColor, Content } from './styles';

export default function Background({ children }) {
  return (
    <Container>
      <BackgroundColor />
      <Content>{children}</Content>
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
