import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Container = styled.View`
  background: ${colors.white};
  flex: 1;
`;

export const BackgroundColor = styled.View`
  height: 150px;
  background: ${colors.primary};
`;

export const Content = styled.ScrollView`
  position: absolute;
  top: 70px;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 ${metrics.basePadding}px;
`;
