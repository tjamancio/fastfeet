import React from 'react';

import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';

import MenuItem from '..';

import colors from '~/styles/colors';

export default function Delete({ onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <MdDelete color={colors.red} size={15} />
      <label>Excluir</label>
    </MenuItem>
  );
}

Delete.propTypes = {
  onClick: PropTypes.func.isRequired,
};
