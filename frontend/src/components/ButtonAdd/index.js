import React from 'react';

import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import colors from '~/styles/colors';

import { Container } from './styles';

export default function ButtonAdd({ onClick }) {
  return (
    <Container onClick={onClick}>
      <MdAdd size={22} color={colors.white} />
      Cadastrar
    </Container>
  );
}

ButtonAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
};
