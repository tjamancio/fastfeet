import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Container = styled.ScrollView`
  background: ${colors.white};
  flex: 1;
  padding: 60px ${metrics.basePadding * 2}px ${metrics.basePadding}px;
`;

export const Avatar = styled.Image`
  align-self: center;
  width: 136px;
  height: 136px;
  border-radius: 68px;
`;

export const InfoContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 30px;
`;

export const Info = styled.View`
  margin-top: ${({ hasMargin }) => (hasMargin ? '15px' : 0)};
  margin-bottom: ${({ hasMargin }) => (hasMargin ? '15px' : 0)};
`;

export const InfoLabel = styled.Text`
  font-size: 12px;
  color: ${colors.grayDark};
`;

export const InfoValue = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.dark};
`;
