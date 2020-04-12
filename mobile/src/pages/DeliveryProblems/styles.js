import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: white;
  text-align: center;
  margin-bottom: ${metrics.baseMargin * 1.5}px;
`;

export const Problem = styled.View`
  border: 1px solid ${colors.gray};
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding}px;
  background: ${colors.white};
  margin-bottom: ${metrics.baseMargin}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProblemDescription = styled.Text`
  font-size: 16px;
  color: ${colors.gray};
  width: 70%;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: ${colors.gray};
  margin-left: ${metrics.baseMargin}px;
`;
