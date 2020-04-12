import { Platform } from 'react-native';

import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: ${colors.primary};

  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  align-self: stretch;

  margin-top: ${metrics.baseMargin * 4}px;
  padding: 0 ${metrics.basePadding}px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.gray,
})`
  color: ${colors.gray};
  background: ${colors.white};
  border-radius: ${metrics.baseRadius}px;
  height: 45px;
  padding: 0 15px;
  margin-bottom: ${metrics.baseMargin * 2}px;
`;
