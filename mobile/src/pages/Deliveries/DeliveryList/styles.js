import styled from 'styled-components/native';

import { colors, metrics } from '~/styles';

export const Container = styled.View`
  margin-top: ${metrics.baseMargin}px;
  flex: 1;
`;

export const Box = styled.View`
  border: 1px solid ${colors.grayLight};
  border-radius: ${metrics.baseRadius}px;
  margin-bottom: ${metrics.baseMargin * 2}px;

  shadow-color: ${colors.grayLight};
  shadow-opacity: 0.25;
  shadow-radius: 2px;
  elevation: 1;
`;

export const Product = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${metrics.basePadding}px;
`;

export const ProductName = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 14px;
  margin-left: ${metrics.baseMargin}px;
`;

export const Timeline = styled.View`
  justify-content: space-between;
  flex-direction: row;
  position: relative;
  z-index: 2;
  padding: 0 20px;
`;

export const TimelineItem = styled.View`
  align-items: center;
`;

export const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary};
  position: absolute;
  top: 5px;
  left: 42px;
  right: 40px;
`;

export const Circle = styled.View`
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  background-color: ${({ completed }) =>
    completed ? colors.primary : colors.white};
  border-width: 1px;
  border-radius: 5px;
  border-color: ${colors.primary};
  overflow: hidden;
`;

export const CircleText = styled.Text`
  font-size: 9px;
  color: ${colors.gray};
  text-align: center;
  padding-top: 2px;
`;

export const Detais = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
  padding: ${metrics.basePadding}px;
  background: rgba(0, 0, 0, 0.03);
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Label = styled.Text`
  font-size: 9px;
  color: ${colors.gray};
`;

export const Value = styled.Text`
  color: ${colors.dark};
  font-size: 12px;
  max-width: ${metrics.screenWidth / 4}px;
`;

export const SeeDetais = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
})`
  align-items: center;
  justify-content: flex-end;
`;

export const SeeDetaisText = styled.Text`
  font-weight: bold;
  color: ${colors.primary};
  align-self: center;
`;

export const Footer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${metrics.baseMargin}px;
`;
