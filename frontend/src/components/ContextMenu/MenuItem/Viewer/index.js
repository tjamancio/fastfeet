import React from 'react';

import PropTypes from 'prop-types';
import { MdVisibility } from 'react-icons/md';

import MenuItem from '..';

import colors from '~/styles/colors';

export default function Viewer({ onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <MdVisibility color={colors.primary} size={15} />
      <label>Visualizar</label>
    </MenuItem>
  );
}

Viewer.propTypes = {
  onClick: PropTypes.func.isRequired,
};
