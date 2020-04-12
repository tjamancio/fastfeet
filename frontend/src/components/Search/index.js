import React from 'react';

import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import colors from '~/styles/colors';

import { Container, Input } from './styles';

export default function Search({ placeholder, onChange }) {
  return (
    <Container>
      <label htmlFor="search">
        <MdSearch color={colors.textLight} size={20} />
      </label>
      <Input id="search" placeholder={placeholder} onChange={onChange} />
    </Container>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
