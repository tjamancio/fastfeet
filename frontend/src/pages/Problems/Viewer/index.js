import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Viewer({ problem }) {
  return (
    <Container>
      <strong>Visualizar problema</strong>
      <p>{problem.description}</p>
    </Container>
  );
}

Viewer.propTypes = {
  problem: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
};
