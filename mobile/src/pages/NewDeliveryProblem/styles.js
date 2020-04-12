import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.gray,
})`
  border: 1px solid ${colors.gray};
  border-radius: ${metrics.baseRadius}px;
  background: ${colors.white};
  padding: ${metrics.basePadding}px;
  margin-bottom: ${metrics.baseMargin * 2}px;
  font-size: 16px;
  color: ${colors.gray};
`;
