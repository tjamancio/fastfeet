import React from 'react';

import PropTypes from 'prop-types';
import { MdEdit } from 'react-icons/md';

import MenuItem from '..';

import colors from '~/styles/colors';

export default function Edit({ onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <MdEdit color={colors.blue} size={15} />
      <label>Editar</label>
    </MenuItem>
  );
}

Edit.propTypes = {
  onClick: PropTypes.func.isRequired,
};
