import React from 'react';

import { MdChevronLeft } from 'react-icons/md';

import history from '~/services/history';
import colors from '~/styles/colors';

import { Container } from './styles';

export default function ButtonBack() {
  function onClick() {
    history.goBack();
  }
  return (
    <Container onClick={onClick}>
      <MdChevronLeft size={22} color={colors.white} />
      Voltar
    </Container>
  );
}
