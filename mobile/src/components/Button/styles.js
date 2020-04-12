import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 45px;
  background: ${({ background }) => background};
  border-radius: ${metrics.baseRadius}px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;
