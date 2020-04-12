import React from 'react';
import { ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';

import { colors } from '~/styles';

import { Container, Text } from './styles';

export default function Button({ children, loading, background, ...rest }) {
  return (
    <Container background={background} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  background: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
