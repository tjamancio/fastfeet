import React from 'react';

import { MdCheck } from 'react-icons/md';

import colors from '~/styles/colors';

import { Container } from './styles';

export default function ButtonAdd() {
  return (
    <Container>
      <MdCheck size={22} color={colors.white} />
      Salvar
    </Container>
  );
}
