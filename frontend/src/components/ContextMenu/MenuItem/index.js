import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function MenuItem({ children, onClick }) {
  return <Container onClick={onClick}>{children}</Container>;
}

MenuItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClick: PropTypes.func.isRequired,
};
