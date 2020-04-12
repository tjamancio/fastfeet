import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Box = styled.View`
  border: 1px solid ${colors.gray};
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding / 2}px;
  margin-bottom: ${metrics.baseMargin}px;
  background: ${colors.white};
  flex: 1;
`;

export const BoxHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BoxHeaderText = styled.Text`
  font-weight: bold;
  color: ${colors.primary};
  margin-left: ${metrics.baseMargin}px;
`;

export const Info = styled.View`
  margin-bottom: ${({ hasMargin }) =>
    hasMargin ? metrics.baseMargin * 1.5 : 0}px;
`;

export const InfoLabel = styled.Text`
  text-transform: uppercase;
  color: ${colors.gray};
  font-weight: bold;
  padding-bottom: 2px;
`;

export const InfoValue = styled.Text`
  color: ${colors.grayDark};
`;

export const InlineInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${metrics.baseMargin}px;
`;

export const BoxOptions = styled.View`
  background: rgba(0, 0, 0, 0.1);
  border-radius: ${metrics.baseRadius}px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${metrics.baseMargin * 2}px;
`;

export const BoxOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  justify-content: flex-start;
  align-items: center;
  width: 33%;
  padding: ${metrics.basePadding}px;
  border-left-width: ${({ hasBorder }) => (hasBorder ? '1' : 0)}px;
  border-right-width: ${({ hasBorder }) => (hasBorder ? '1' : 0)}px;
  border-color: ${colors.gray};
`;

export const BoxOptionText = styled.Text`
  font-size: 12px;
  color: gray;
  text-align: center;
  margin-top: 5px;
`;
